"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Trophy, User, FileText, Trash2, Pencil } from "lucide-react"
import { Achievement, AchievementWithFeedback } from "@/types/student"
import { FilePreview } from "./file-preview";
import { Button } from "@/components/ui/button";

interface AchievementModalProps {
  achievement?: Achievement | AchievementWithFeedback | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showRemoveButton?: boolean;
  onRemove?: () => void;
  showEditButton?: boolean;
  onEdit?: () => void;
}

export function AchievementModal({ 
  achievement, 
  open, 
  onOpenChange,
  showRemoveButton,
  onRemove,
  showEditButton,
  onEdit
}: AchievementModalProps) {
  if (!achievement) return null;

  const hasStudentInfo = 'studentName' in achievement;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Achievement Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{achievement.title}</h3>
            <Badge className="capitalize">{achievement.type}</Badge>
            <Badge className={`ml-2 capitalize ${
              achievement.status === 'approved' ? 'bg-primary/10 text-primary' :
              achievement.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
              'bg-accent/10 text-accent'
            }`}>
              {achievement.status}
            </Badge>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{achievement.date}</span>
            </div>
            
            {hasStudentInfo && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{(achievement as AchievementWithFeedback).studentName}</span>
              </div>
            )}

            {'feedback' in achievement && achievement.feedback && (
              <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <FileText className="h-4 w-4" />
                  <span>Feedback</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.feedback.feedback}
                </p>
                <p className="text-xs text-muted-foreground">
                  By {achievement.feedback.reviewedBy} on{' '}
                  {new Date(achievement.feedback.reviewedAt).toLocaleDateString()}
                </p>
              </div>
            )}

            {/* Description */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm leading-relaxed">{achievement.description}</p>
            </div>

            {/* Files */}
            {achievement.files && achievement.files.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Attached Files</h4>
                <div className="grid gap-2">
                  {achievement.files.map((file) => (
                    <FilePreview key={file.id} file={file} />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            {showEditButton && onEdit && (
              <Button
                variant="outline"
                onClick={onEdit}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Achievement
              </Button>
            )}
            {showRemoveButton && onRemove && (
              <Button
                variant="destructive"
                onClick={onRemove}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Achievement
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
