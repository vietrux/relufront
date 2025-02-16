"use client"

import { Achievement } from "@/types/student";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Pencil } from "lucide-react";
import { useState } from "react";
import { AchievementModal } from "@/components/shared/achievement-modal";
import { AchievementEditDialog } from "./achievement-edit-dialog";

interface AchievementListProps {
  achievements: Achievement[];
  onRemove: (id: string) => void;
  onEdit: (achievement: Achievement) => void;
}

export function AchievementList({ achievements, onRemove, onEdit }: AchievementListProps) {
  const [viewingAchievement, setViewingAchievement] = useState<Achievement | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
  };

  const handleSaveEdit = (updatedAchievement: Achievement) => {
    onEdit(updatedAchievement);
    setEditingAchievement(null);
  };

  return (
    <div className="space-y-4">
      {achievements.map((achievement) => {
        const isApproved = achievement.status === 'approved';
        
        return (
          <Card key={achievement.id} className="bg-card">
            <CardHeader className="pb-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{achievement.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(achievement.status)}`}>
                    {achievement.status.charAt(0).toUpperCase() + achievement.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingAchievement(achievement)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                
                {!isApproved && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(achievement)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRemove(achievement.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {viewingAchievement && (
        <AchievementModal
          achievement={viewingAchievement}
          open={!!viewingAchievement}
          onOpenChange={() => setViewingAchievement(null)}
          showRemoveButton={!viewingAchievement.status.includes('approved')}
          onRemove={() => {
            onRemove(viewingAchievement.id);
            setViewingAchievement(null);
          }}
          showEditButton={!viewingAchievement.status.includes('approved')}
          onEdit={() => handleEdit(viewingAchievement)}
        />
      )}

      <AchievementEditDialog
        achievement={editingAchievement}
        open={!!editingAchievement}
        onOpenChange={(open) => !open && setEditingAchievement(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
