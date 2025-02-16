"use client"

import { FileIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AchievementFile } from "@/types/student";

interface FilePreviewProps {
  file: File | AchievementFile;
  onRemove?: () => void;
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const isUploadedFile = 'url' in file;
  const isImage = file.type.startsWith('image/') || file.type === 'image';
  
  return (
    <div className="relative group">
      <div className="flex items-center p-3 gap-3 rounded-lg border bg-muted/40">
        {isImage ? (
          <div className="relative w-10 h-10 rounded overflow-hidden">
            <Image
              src={isUploadedFile ? (file as AchievementFile).url : URL.createObjectURL(file as File)}
              alt={file.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <FileIcon className="w-10 h-10 text-muted-foreground" />
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {isUploadedFile ? 
              (file as AchievementFile).type : 
              `${(file as File).size / 1024 / 1024}MB`}
          </p>
        </div>
        {onRemove && (
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
