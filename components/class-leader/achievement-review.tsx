"use client";

import { AchievementWithFeedback } from "@/types/student";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { AchievementModal } from "@/components/shared/achievement-modal";

interface AchievementReviewProps {
  achievement: AchievementWithFeedback;
  onApprove: (id: string) => void;
  onReject: (id: string, feedback: string) => void;
  onRemove?: (id: string) => void;
  userRole: 'advisor' | 'class-leader';
}

export function AchievementReview({ 
  achievement, 
  onApprove, 
  onReject,
  onRemove
}: AchievementReviewProps) {
  const [feedback, setFeedback] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const canRemove = achievement?.status === 'pending' || achievement?.status === 'rejected';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-primary/10 text-primary';
      case 'rejected': return 'bg-destructive/10 text-destructive';
      default: return 'bg-accent/10 text-accent';
    }
  };

  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsViewModalOpen(true)}
            >
              <h3 className="text-xl font-bold">{achievement?.title}</h3>
              <p className="text-sm text-muted-foreground">
                Submitted by {achievement?.studentName}
                <span className="mx-2">•</span>
                <span className={`capitalize ${getStatusColor(achievement?.status)}`}>
                  {achievement?.status}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              {canRemove && onRemove && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onRemove(achievement.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              {achievement?.status === 'pending' && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => onApprove(achievement.id)}
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    Approve
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onReject(achievement.id, feedback)}
                    className="bg-destructive/10 text-destructive hover:bg-destructive/20"
                  >
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        {achievement?.status === 'pending' && (
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">Feedback</p>
              <Textarea
                placeholder="Enter feedback for rejection..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="resize-none"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {achievement && (
        <AchievementModal
          achievement={achievement}
          open={isViewModalOpen}
          onOpenChange={setIsViewModalOpen}
        />
      )}
    </>
  );
}
