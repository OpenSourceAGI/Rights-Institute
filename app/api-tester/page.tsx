"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Play,
  Home,
  Code2,
  FileJson,
  Database,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";

interface ApiEndpoint {
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
  bodyTemplate?: string;
  category: "documents" | "buttons" | "auth";
}

const API_ENDPOINTS: ApiEndpoint[] = [
  // Documents API
  {
    name: "Get All Documents",
    method: "GET",
    path: "/api/documents",
    description: "Retrieve all documents for the authenticated user",
    category: "documents",
  },
  {
    name: "Create Document",
    method: "POST",
    path: "/api/documents",
    description: "Create a new document",
    bodyTemplate: JSON.stringify(
      {
        title: "My Document",
        content: "Document content here...",
        type: "contract",
      },
      null,
      2
    ),
    category: "documents",
  },
  {
    name: "Update Document",
    method: "PUT",
    path: "/api/documents/{id}",
    description: "Update an existing document (replace {id} with document ID)",
    bodyTemplate: JSON.stringify(
      {
        title: "Updated Title",
        content: "Updated content...",
      },
      null,
      2
    ),
    category: "documents",
  },
  {
    name: "Delete Document",
    method: "DELETE",
    path: "/api/documents/{id}",
    description: "Delete a document (replace {id} with document ID)",
    category: "documents",
  },
  // Custom Buttons API
  {
    name: "Get All Custom Buttons",
    method: "GET",
    path: "/api/custom-buttons",
    description: "Retrieve all custom buttons for the authenticated user",
    category: "buttons",
  },
  {
    name: "Create Custom Button",
    method: "POST",
    path: "/api/custom-buttons",
    description: "Create a new custom button",
    bodyTemplate: JSON.stringify(
      {
        label: "My Button",
        url: "https://example.com",
        description: "Button description",
        icon: "🚀",
        color: "blue",
        category: "Navigation",
        isActive: true,
      },
      null,
      2
    ),
    category: "buttons",
  },
  {
    name: "Update Custom Button",
    method: "PUT",
    path: "/api/custom-buttons/{id}",
    description: "Update an existing custom button (replace {id} with button ID)",
    bodyTemplate: JSON.stringify(
      {
        label: "Updated Label",
        isActive: false,
      },
      null,
      2
    ),
    category: "buttons",
  },
  {
    name: "Delete Custom Button",
    method: "DELETE",
    path: "/api/custom-buttons/{id}",
    description: "Delete a custom button (replace {id} with button ID)",
    category: "buttons",
  },
];

export default function ApiTesterPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(
    API_ENDPOINTS[0]
  );
  const [customPath, setCustomPath] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await authClient.getSession();
      if (!data?.session) {
        router.push("/login");
      } else {
        setSession(data.session);
      }
    };
    checkSession();
  }, [router]);

  const handleEndpointChange = (endpoint: ApiEndpoint) => {
    setSelectedEndpoint(endpoint);
    setCustomPath(endpoint.path);
    setRequestBody(endpoint.bodyTemplate || "");
    setResponse(null);
  };

  const handleExecuteRequest = async () => {
    setIsLoading(true);
    setResponse(null);

    try {
      const options: RequestInit = {
        method: selectedEndpoint.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (requestBody && (selectedEndpoint.method === "POST" || selectedEndpoint.method === "PUT")) {
        try {
          JSON.parse(requestBody);
          options.body = requestBody;
        } catch (e) {
          setResponse({
            error: "Invalid JSON in request body",
            details: (e as Error).message,
          });
          setIsLoading(false);
          return;
        }
      }

      const startTime = Date.now();
      const res = await fetch(customPath, options);
      const endTime = Date.now();

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        time: `${endTime - startTime}ms`,
        headers: Object.fromEntries(res.headers.entries()),
        data,
      });
    } catch (error) {
      setResponse({
        error: "Request failed",
        details: (error as Error).message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCurlCommand = () => {
    let curl = `curl -X ${selectedEndpoint.method} '${window.location.origin}${customPath}' \\
  -H 'Content-Type: application/json' \\
  --cookie-jar cookies.txt \\
  --cookie cookies.txt`;

    if (requestBody && (selectedEndpoint.method === "POST" || selectedEndpoint.method === "PUT")) {
      curl += ` \\\n  -d '${requestBody}'`;
    }

    return curl;
  };

  const generateFetchCode = () => {
    const code = `fetch('${customPath}', {
  method: '${selectedEndpoint.method}',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },${
    requestBody && (selectedEndpoint.method === "POST" || selectedEndpoint.method === "PUT")
      ? `\n  body: JSON.stringify(${requestBody}),`
      : ""
  }
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`;

    return code;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              API Tester & Documentation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Test and explore your document and custom button APIs
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Endpoint Selection */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Select an endpoint to test</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="mb-4">
                <Label className="text-xs font-semibold text-gray-500">
                  DOCUMENTS API
                </Label>
                {API_ENDPOINTS.filter((e) => e.category === "documents").map(
                  (endpoint) => (
                    <Button
                      key={endpoint.name}
                      variant={
                        selectedEndpoint.name === endpoint.name
                          ? "default"
                          : "ghost"
                      }
                      className="w-full justify-start mt-1"
                      onClick={() => handleEndpointChange(endpoint)}
                      size="sm"
                    >
                      <span
                        className={`text-xs font-mono mr-2 px-1.5 py-0.5 rounded ${
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-700"
                            : endpoint.method === "POST"
                            ? "bg-blue-100 text-blue-700"
                            : endpoint.method === "PUT"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="truncate">{endpoint.name}</span>
                    </Button>
                  )
                )}
              </div>

              <div className="mb-4">
                <Label className="text-xs font-semibold text-gray-500">
                  CUSTOM BUTTONS API
                </Label>
                {API_ENDPOINTS.filter((e) => e.category === "buttons").map(
                  (endpoint) => (
                    <Button
                      key={endpoint.name}
                      variant={
                        selectedEndpoint.name === endpoint.name
                          ? "default"
                          : "ghost"
                      }
                      className="w-full justify-start mt-1"
                      onClick={() => handleEndpointChange(endpoint)}
                      size="sm"
                    >
                      <span
                        className={`text-xs font-mono mr-2 px-1.5 py-0.5 rounded ${
                          endpoint.method === "GET"
                            ? "bg-green-100 text-green-700"
                            : endpoint.method === "POST"
                            ? "bg-blue-100 text-blue-700"
                            : endpoint.method === "PUT"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {endpoint.method}
                      </span>
                      <span className="truncate">{endpoint.name}</span>
                    </Button>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Panel - Request/Response */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  Request Configuration
                </CardTitle>
                <CardDescription>{selectedEndpoint.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Endpoint Path</Label>
                  <Input
                    value={customPath}
                    onChange={(e) => setCustomPath(e.target.value)}
                    placeholder="/api/documents"
                  />
                </div>

                {(selectedEndpoint.method === "POST" ||
                  selectedEndpoint.method === "PUT") && (
                  <div className="space-y-2">
                    <Label>Request Body (JSON)</Label>
                    <Textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      placeholder="Enter JSON request body"
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>
                )}

                <Button
                  onClick={handleExecuteRequest}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    "Executing..."
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Execute Request
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Response */}
            {response && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileJson className="h-5 w-5" />
                    Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {response.error ? (
                    <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                      <p className="font-semibold text-red-700 dark:text-red-400">
                        {response.error}
                      </p>
                      <p className="text-sm text-red-600 dark:text-red-500 mt-1">
                        {response.details}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full font-semibold ${
                            response.status >= 200 && response.status < 300
                              ? "bg-green-100 text-green-700"
                              : response.status >= 400
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {response.status} {response.statusText}
                        </span>
                        <span className="text-gray-600">
                          ⏱️ {response.time}
                        </span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto max-h-96">
                        <pre className="text-sm">
                          {JSON.stringify(response.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Code Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="fetch">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="fetch">Fetch API</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  <TabsContent value="fetch" className="space-y-2">
                    <div className="relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => handleCopyCode(generateFetchCode())}
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                      <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm">
                        <code>{generateFetchCode()}</code>
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="curl" className="space-y-2">
                    <div className="relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute top-2 right-2 z-10"
                        onClick={() => handleCopyCode(generateCurlCommand())}
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                      <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-auto text-sm">
                        <code>{generateCurlCommand()}</code>
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
