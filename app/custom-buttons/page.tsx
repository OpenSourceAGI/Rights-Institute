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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Home,
  Sparkles,
  Power,
  PowerOff,
} from "lucide-react";
import Link from "next/link";
import {
  CustomButton,
  BUTTON_CATEGORIES,
  BUTTON_COLORS,
  type ButtonCategory,
  type ButtonColor,
} from "@/types/custom-button";

export default function CustomButtonsPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [buttons, setButtons] = useState<CustomButton[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingButton, setEditingButton] = useState<CustomButton | null>(null);

  const [formData, setFormData] = useState({
    label: "",
    url: "",
    description: "",
    icon: "",
    color: "blue" as ButtonColor,
    category: "Other" as ButtonCategory,
    isActive: true,
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await authClient.getSession();
      if (!data?.session) {
        router.push("/login");
      } else {
        setSession(data.session);
        loadButtons();
      }
    };
    checkSession();
  }, [router]);

  const loadButtons = async () => {
    try {
      const response = await fetch("/api/custom-buttons", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setButtons(data);
      }
    } catch (error) {
      console.error("Failed to load buttons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (button?: CustomButton) => {
    if (button) {
      setEditingButton(button);
      setFormData({
        label: button.label,
        url: button.url,
        description: button.description || "",
        icon: button.icon || "",
        color: (button.color as ButtonColor) || "blue",
        category: (button.category as ButtonCategory) || "Other",
        isActive: button.isActive,
      });
    } else {
      setEditingButton(null);
      setFormData({
        label: "",
        url: "",
        description: "",
        icon: "",
        color: "blue",
        category: "Other",
        isActive: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingButton(null);
    setFormData({
      label: "",
      url: "",
      description: "",
      icon: "",
      color: "blue",
      category: "Other",
      isActive: true,
    });
  };

  const handleSaveButton = async () => {
    if (!formData.label || !formData.url) {
      alert("Label and URL are required!");
      return;
    }

    try {
      const url = editingButton
        ? `/api/custom-buttons/${editingButton.id}`
        : "/api/custom-buttons";
      const method = editingButton ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await loadButtons();
        handleCloseDialog();
      } else {
        const error = await response.json();
        alert(`Failed to save button: ${error.error}`);
      }
    } catch (error) {
      console.error("Failed to save button:", error);
      alert("Failed to save button");
    }
  };

  const handleDeleteButton = async (id: string) => {
    if (!confirm("Are you sure you want to delete this button?")) {
      return;
    }

    try {
      const response = await fetch(`/api/custom-buttons/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        await loadButtons();
      } else {
        alert("Failed to delete button");
      }
    } catch (error) {
      console.error("Failed to delete button:", error);
      alert("Failed to delete button");
    }
  };

  const handleToggleActive = async (button: CustomButton) => {
    try {
      const response = await fetch(`/api/custom-buttons/${button.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isActive: !button.isActive }),
      });

      if (response.ok) {
        await loadButtons();
      } else {
        alert("Failed to toggle button status");
      }
    } catch (error) {
      console.error("Failed to toggle button:", error);
      alert("Failed to toggle button status");
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "from-blue-500 to-cyan-500",
      green: "from-green-500 to-emerald-500",
      red: "from-red-500 to-pink-500",
      purple: "from-purple-500 to-violet-500",
      orange: "from-orange-500 to-yellow-500",
      pink: "from-pink-500 to-rose-500",
      gray: "from-gray-500 to-slate-500",
    };
    return colorMap[color] || colorMap.blue;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="h-12 w-12 animate-pulse mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Custom Buttons
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create and manage your custom navigation buttons
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Button onClick={() => handleOpenDialog()} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Button
            </Button>
          </div>
        </div>

        {/* Buttons Grid */}
        {buttons.length === 0 ? (
          <Card className="text-center p-12">
            <CardContent className="pt-6">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold mb-2">No custom buttons yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first custom button to get started
              </p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Create Button
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buttons.map((button) => (
              <Card
                key={button.id}
                className={`relative overflow-hidden transition-all hover:shadow-lg ${
                  !button.isActive ? "opacity-50" : ""
                }`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getColorClasses(
                    button.color || "blue"
                  )}`}
                />
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {button.label}
                        {!button.isActive && (
                          <PowerOff className="h-4 w-4 text-gray-400" />
                        )}
                      </CardTitle>
                      {button.category && (
                        <CardDescription className="text-xs mt-1">
                          {button.category}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {button.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {button.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                    <a
                      href={button.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline truncate"
                    >
                      {button.url}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(button)}
                      className="flex-1"
                    >
                      {button.isActive ? (
                        <>
                          <PowerOff className="h-4 w-4 mr-2" />
                          Disable
                        </>
                      ) : (
                        <>
                          <Power className="h-4 w-4 mr-2" />
                          Enable
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(button)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteButton(button.id)}
                      className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingButton ? "Edit Button" : "Create New Button"}
            </DialogTitle>
            <DialogDescription>
              {editingButton
                ? "Update your custom button details"
                : "Add a new custom button to your collection"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="label">Label *</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                  placeholder="e.g., My Website"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">URL *</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Optional description for this button"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as ButtonCategory })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BUTTON_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Select
                  value={formData.color}
                  onValueChange={(value) =>
                    setFormData({ ...formData, color: value as ButtonColor })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BUTTON_COLORS.map((col) => (
                      <SelectItem key={col} value={col}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full bg-gradient-to-r ${getColorClasses(
                              col
                            )}`}
                          />
                          {col.charAt(0).toUpperCase() + col.slice(1)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Icon (emoji)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="🚀"
                  maxLength={2}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button onClick={handleSaveButton}>
              {editingButton ? "Save Changes" : "Create Button"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
