import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Achievement, AchievementFile } from "@/types/student";
import { useState } from "react";
import { Upload, X, FileText } from "lucide-react";

interface AchievementEditDialogProps {
  achievement: Achievement | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (achievement: Achievement) => void;
}

export function AchievementEditDialog({
  achievement,
  open,
  onOpenChange,
  onSave,
}: AchievementEditDialogProps) {
  const [formData, setFormData] = useState<Partial<Achievement>>(achievement || {});
  const [files, setFiles] = useState<AchievementFile[]>(achievement?.files || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const handleFileAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setNewFiles([...newFiles, ...Array.from(fileList)]);
    }
  };

  const handleFileRemove = (fileId: string) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  const handleNewFileRemove = (index: number) => {
    setNewFiles(newFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (achievement && formData) {
      onSave({
        ...achievement,
        ...formData,
        files: [
          ...files,
          ...newFiles.map((file, index) => ({
            id: `new-${index}`,
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
            size: file.size
          }))
        ]
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Achievement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Original Content Section */}
          <div className="p-4 bg-muted/30 rounded-lg space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground">Original Content</h4>
            <p className="font-medium">{achievement?.title}</p>
            <p className="text-sm text-muted-foreground">{achievement?.description}</p>
          </div>

          {/* Edit Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title || achievement?.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Achievement title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || achievement?.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your achievement"
                required
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={formData.type || achievement?.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Achievement type"
                required
              />
            </div>

            {/* Files Section */}
            <div className="space-y-4">
              <Label>Files</Label>
              
              {/* Existing Files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Current Files:</p>
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFileRemove(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* New Files */}
              {newFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">New Files:</p>
                  {newFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-primary/10 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleNewFileRemove(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* File Upload Input */}
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="h-6 w-6 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload new files</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileAdd}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
