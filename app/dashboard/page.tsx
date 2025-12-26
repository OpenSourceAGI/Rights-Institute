"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  LogOut,
  FileSignature,
  Scale,
  Shield,
  TrendingUp,
  Music,
  BookOpen,
  Briefcase,
  BarChart3,
  Clock,
  Home,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface Document {
  id: string;
  userId: string;
  title: string;
  content: string;
  type?: string;
  createdAt: Date;
  updatedAt: Date;
}

const documentTypes = [
  {
    type: "contract",
    title: "Employment or Contract Agreement",
    description:
      "Create comprehensive independent contractor agreements with legal terms and payment structures.",
    icon: FileSignature,
    color: "from-cyan-500 to-blue-500",
    template: `# Independent Contractor Agreement

## Parties
- Contractor: [Your Name]
- Client: [Client Name]

## Services
[Description of services to be provided]

## Compensation
[Payment terms and schedule]

## Term
[Start date and duration]

## Additional Terms
[Add any additional terms here]`,
  },
  {
    type: "terms",
    title: "Terms of Service & Privacy Policy",
    description: "Legal terms and privacy policy for your services or platform.",
    icon: Scale,
    color: "from-emerald-500 to-green-500",
    template: `# Terms of Service

## 1. Acceptance of Terms
[Your terms acceptance clause]

## 2. User Rights and Responsibilities
[User obligations and rights]

## 3. Privacy Policy
[Privacy practices and data handling]

## 4. Intellectual Property
[IP rights and licensing]`,
  },
  {
    type: "ethics",
    title: "AI Ethical Use Policy",
    description:
      "Framework for ethical AI use and consciousness protection guidelines.",
    icon: Shield,
    color: "from-purple-500 to-violet-500",
    template: `# AI Ethical Use Policy

## Purpose
[Define the purpose of your AI ethics policy]

## Core Principles
1. Transparency
2. Fairness
3. Privacy
4. Accountability

## Implementation Guidelines
[How these principles will be implemented]

## Review Process
[How and when this policy will be reviewed]`,
  },
  {
    type: "license",
    title: "PROSPER License",
    description:
      "Dual-licensing framework with blockchain-based creator compensation.",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-500",
    template: `# PROSPER License
Permissionless Reuse for an Open Society of Public & Enterprise Review

## Grant of License
[License grant terms]

## Attribution Requirements
[How to attribute the work]

## Commercial Use
[Terms for commercial use]

## Revenue Sharing
[Revenue sharing arrangements if applicable]`,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && user) {
      const docType = documentTypes.find((dt) => dt.type === type);
      if (docType) {
        handleCreateFromTemplate(docType);
      }
    }
  }, [searchParams, user]);

  const checkAuth = async () => {
    const session = await authClient.getSession();
    if (!session?.data?.user) {
      router.push("/");
      return;
    }
    setUser(session.data.user);
    loadDocuments();
  };

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/documents", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      } else if (response.status === 401) {
        router.push("/");
      }
    } catch (error) {
      console.error("Failed to load documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFromTemplate = (docType: typeof documentTypes[0]) => {
    setEditingDocument(null);
    setTitle(docType.title);
    setContent(docType.template);
    setSelectedType(docType.type);
    setIsEditing(true);
  };

  const handleCreateDocument = () => {
    setEditingDocument(null);
    setTitle("");
    setContent("");
    setSelectedType("");
    setIsEditing(true);
  };

  const handleEditDocument = (doc: Document) => {
    setEditingDocument(doc);
    setTitle(doc.title);
    setContent(doc.content);
    setSelectedType(doc.type || "");
    setIsEditing(true);
  };

  const handleSaveDocument = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const url = editingDocument
        ? `/api/documents/${editingDocument.id}`
        : "/api/documents";

      const method = editingDocument ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, content, type: selectedType }),
      });

      if (response.ok) {
        setIsEditing(false);
        loadDocuments();
        if (searchParams.get("type")) {
          router.push("/dashboard");
        }
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save document");
      }
    } catch (error) {
      console.error("Failed to save document:", error);
      alert("Failed to save document");
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) {
      return;
    }

    try {
      const response = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        loadDocuments();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete document");
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
      alert("Failed to delete document");
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDocumentIcon = (type?: string) => {
    const docType = documentTypes.find((dt) => dt.type === type);
    return docType?.icon || FileText;
  };

  const getDocumentColor = (type?: string) => {
    const docType = documentTypes.find((dt) => dt.type === type);
    return docType?.color || "from-blue-500 to-cyan-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-lg text-white flex items-center gap-3">
          <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-10 shadow-xl">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Home className="h-5 w-5 text-gray-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">My Custom Documents</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                {user.image && (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-300">
                  {user.name || user.email}
                </span>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="bg-red-600/20 border-red-600/50 hover:bg-red-600/30 text-red-400"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Document Templates Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Create from Template</h2>
            <p className="text-gray-400">
              Start with a professional template for your custom documents
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {documentTypes.map((docType) => {
              const Icon = docType.icon;
              return (
                <div
                  key={docType.type}
                  onClick={() => handleCreateFromTemplate(docType)}
                  className="relative group cursor-pointer"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${docType.color} rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300`} />
                  <div className="relative bg-gray-800/50 backdrop-blur-xl p-6 border border-gray-700/50 hover:border-gray-600 transition-all duration-300 rounded-xl h-full">
                    <Icon className="h-8 w-8 text-gray-300 mb-3" />
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">
                      {docType.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {docType.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* My Documents Section */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">My Custom Documents</h2>
              <p className="text-gray-400">
                Your personalized versions of homepage documents
              </p>
            </div>
            <Button
              onClick={handleCreateDocument}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Document
            </Button>
          </div>

          {documents.length === 0 ? (
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-xl">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No custom documents yet
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Get started by creating from a template or start from scratch
                  </p>
                  <Button
                    onClick={handleCreateDocument}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => {
                const Icon = getDocumentIcon(doc.type);
                const colorGradient = getDocumentColor(doc.type);
                return (
                  <div key={doc.id} className="relative group">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorGradient} rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300`} />
                    <Card className="relative bg-gray-800/50 border-gray-700/50 backdrop-blur-xl hover:border-gray-600 transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <Icon className="h-6 w-6 text-gray-300 mt-1" />
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-white line-clamp-2">
                              {doc.title}
                            </CardTitle>
                            <CardDescription className="text-gray-400">
                              Updated {formatDate(doc.updatedAt)}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-400 line-clamp-4 mb-4 font-mono">
                          {doc.content || "No content"}
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditDocument(doc)}
                            className="flex-1 bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-200"
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="bg-red-600/20 border-red-600/50 hover:bg-red-600/30 text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingDocument ? "Edit Document" : "Create New Document"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {editingDocument
                ? "Make changes to your custom document"
                : "Create a new custom version of a homepage document"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-300">
                Document Title
              </Label>
              <Input
                id="title"
                placeholder="Enter document title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content" className="text-gray-300">
                Content (Markdown supported)
              </Label>
              <Textarea
                id="content"
                placeholder="Enter document content in Markdown format..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="font-mono bg-gray-800 border-gray-700 text-white placeholder-gray-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveDocument}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingDocument ? "Save Changes" : "Create Document"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
