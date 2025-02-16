"use client"

import { ClassMember } from "@/types/student";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCog, Crown, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ClassMembersListProps {
  members: ClassMember[];
  onSelectMember: (memberId: string) => void;
  selectedMemberId?: string;
  onSetLeader: (studentId: string) => void;
  userRole?: 'advisor' | 'class-leader';
}

export function ClassMembersList({ 
  members, 
  onSelectMember, 
  selectedMemberId, 
  onSetLeader,
  userRole = 'class-leader'
}: ClassMembersListProps) {
  const currentLeader = members.find(m => m.isLeader);

  return (
    <Card className="h-[600px] flex flex-col bg-card">
      <CardHeader>
        <h2 className="text-2xl font-bold">Class Members</h2>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {/* Current Leader Section */}
            {currentLeader && (
              <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium">Current Class Leader</p>
                    <p className="text-sm text-muted-foreground">{currentLeader.name}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Members List */}
            {members.map((member) => (
              <div
                key={member.studentId}
                className={cn(
                  "p-4 rounded-lg flex flex-col gap-2",
                  selectedMemberId === member.studentId
                    ? "bg-primary/10"
                    : "hover:bg-muted",
                  member.isLeader && "border-2 border-amber-500/50"
                )}
              >
                <div
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => onSelectMember(member.studentId)}
                >
                  <Avatar>
                    <AvatarImage src={member.avatarUrl} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium flex items-center gap-2">
                      {member.name}
                      {member.isLeader && (
                        <Crown className="h-4 w-4 text-amber-500" />
                      )}
                    </p>
                    <div className="flex items-center gap-3 text-sm mt-1">
                      <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <span className="text-emerald-700 dark:text-emerald-400">
                          ✓ {member.approvedAchievements}
                        </span>
                      </div>
                      {member.pendingAchievements > 0 && (
                        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30">
                          <span className="text-amber-700 dark:text-amber-400">
                            ⋯ {member.pendingAchievements}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {userRole === 'advisor' && !member.isLeader && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSetLeader(member.studentId);
                            }}
                          >
                            <UserCog className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Set as Class Leader</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            ))}

            {members.length === 0 && (
              <div className="text-center p-4 text-muted-foreground">
                <AlertCircle className="h-5 w-5 mx-auto mb-2" />
                <p>No members found</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
