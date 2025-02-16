"use client"

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClassMembersList } from "@/components/class-leader/class-members-list";
import { AchievementReview } from "@/components/class-leader/achievement-review";
import { ProfileCard } from "@/components/student/profile-card";
import { AchievementList } from "@/components/student/achievement-list";
import { AchievementForm } from "@/components/student/achievement-form";
import { useState } from "react";
import { ClassMember, AchievementWithFeedback, StudentProfile, Achievement } from "@/types/student";

// Mock data for student view
const mockStudentProfile: StudentProfile = {
  name: "John Doe",
  email: "john@example.com",
  studentId: "STD001",
  role: "Class Leader",
  classId: "CS-2024"
};

const mockStudentAchievements: Achievement[] = [
  { 
    id: "1", 
    title: "Math Competition Winner",
    description: "Won first place in the regional mathematics competition",
    date: "2024-02-20",
    type: "Academic",
    status: "approved"
  }
];

// Mock data for class leader view
const mockMembers: ClassMember[] = [
  {
    name: "Jane Smith",
    email: "jane@example.com",
    studentId: "STD002",
    role: "Student",
    classId: "CS-2024",
    totalAchievements: 5,
    pendingAchievements: 2,
    approvedAchievements: 3
  }
];

const mockPendingAchievements: AchievementWithFeedback[] = [
  {
    id: "2",
    title: "Science Fair Project",
    description: "Student's science fair project submission",
    date: "2024-02-21",
    type: "Academic",
    status: "pending",
    studentName: "Jane Smith",
    studentId: "STD002"
  }
];

export default function ClassLeaderDashboard() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>();
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [activeTab, setActiveTab] = useState("achievements");

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setActiveTab("upload"); // Switch to upload tab when editing
  };

  const handleSetLeader = (studentId: string) => {
    console.log('Set new leader:', studentId);
    // Add actual set leader logic here
  };

  const handleApprove = (id: string) => {
    console.log('Approved:', id);
  };

  const handleReject = (id: string, feedback: string) => {
    console.log('Rejected:', id, feedback);
  };

  const handleRemove = (id: string) => {
    console.log('Removed achievement:', id);
    // Add actual remove logic here
  };

  const handleStudentAchievementRemove = (id: string) => {
    console.log('Removed student achievement:', id);
    // Add actual remove logic here
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      <Tabs defaultValue="my-achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-achievements">My Dashboard</TabsTrigger>
          <TabsTrigger value="class-management">Class Management</TabsTrigger>
        </TabsList>

        {/* My Dashboard Tab */}
        <TabsContent value="my-achievements" className="mt-6 space-y-6">
          <ProfileCard profile={mockStudentProfile} />
          
          <Card>
            <CardHeader>
              <CardTitle>My Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab} 
                className="w-full"
              >
                <TabsList>
                  <TabsTrigger value="achievements">View Achievements</TabsTrigger>
                  <TabsTrigger value="upload">Upload Achievement</TabsTrigger>
                </TabsList>
                
                <TabsContent value="achievements" className="mt-4">
                  <ScrollArea className="h-[500px]">
                    <div className="pr-4 space-y-4">
                      <AchievementList 
                        achievements={mockStudentAchievements}
                        onRemove={handleStudentAchievementRemove}
                        onEdit={handleEdit}
                      />
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="upload" className="mt-4">
                  <AchievementForm 
                    initialData={editingAchievement}
                    onSubmit={(data) => {
                      console.log('Submitted:', data);
                      setEditingAchievement(null);
                      setActiveTab("achievements"); // Switch back to achievements tab after submit
                    }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Management Tab */}
        <TabsContent value="class-management" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Members List */}
            <div className="lg:col-span-4">
              <Card className="h-[calc(100vh-200px)]">
                <CardHeader>
                  <CardTitle>Class Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="pr-4">
                      <ClassMembersList
                        members={mockMembers}
                        onSelectMember={setSelectedMemberId}
                        selectedMemberId={selectedMemberId}
                        onSetLeader={handleSetLeader}
                      />
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Achievements Review */}
            <div className="lg:col-span-8">
              <Card className="h-[calc(100vh-200px)]">
                <CardHeader>
                  <CardTitle>
                    {selectedMemberId 
                      ? `${mockMembers.find(m => m.studentId === selectedMemberId)?.name}'s Achievements`
                      : 'Select a Student'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-4 pr-4">
                      {selectedMemberId ? (
                        mockPendingAchievements
                          .filter(a => a.studentId === selectedMemberId)
                          .map(achievement => (
                            <AchievementReview
                              key={achievement.id}
                              achievement={achievement}
                              onApprove={handleApprove}
                              onReject={handleReject}
                              onRemove={handleRemove}
                              userRole="class-leader"
                            />
                          ))
                      ) : (
                        <div className="text-center text-muted-foreground p-8">
                          Select a student from the list to review their achievements
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
