import { useState, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, Image as ImageIcon, Link } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageUploaded: (imageUrl: string) => void;
  title?: string;
}

export function ImageUploadDialog({
  open,
  onOpenChange,
  onImageUploaded,
  title = "Upload Design",
}: ImageUploadDialogProps) {
  const [uploading, setUploading] = useState(false);
  const [figmaUrl, setFigmaUrl] = useState("");
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("design-assets")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("design-assets").getPublicUrl(filePath);

      toast({
        title: "Upload successful",
        description: "Design image has been uploaded.",
      });

      onImageUploaded(data.publicUrl);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }, [onImageUploaded, onOpenChange, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    maxFiles: 1,
    disabled: uploading,
  });

  const handleFigmaUrl = () => {
    if (!figmaUrl.trim()) return;

    // TODO: In a real implementation, this would fetch from Figma API
    toast({
      title: "Figma import",
      description: "Figma import will be available with API integration.",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Upload a design image or import from Figma</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Drag & Drop Upload */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Drop your design here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports: PNG, JPG, WEBP, GIF (max 20MB)
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or import from</span>
            </div>
          </div>

          {/* Figma URL Input */}
          <div className="space-y-2">
            <Label htmlFor="figma-url">Figma File URL</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="figma-url"
                  placeholder="https://figma.com/file/..."
                  value={figmaUrl}
                  onChange={(e) => setFigmaUrl(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button onClick={handleFigmaUrl} disabled={!figmaUrl.trim()}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Requires Figma API token (configure in Settings)
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
