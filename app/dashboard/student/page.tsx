"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileCard } from "@/components/student/profile-card";
import { AchievementList } from "@/components/student/achievement-list";
import { AchievementForm } from "@/components/student/achievement-form";
import { StudentProfile, Achievement } from "@/types/student";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Upload, Clock } from "lucide-react";

// Mock data with more detailed achievements
const mockProfile: StudentProfile = {
  name: "John Student",
  email: "john.student@example.com",
  studentId: "STD003",
  role: "Student",
  classId: "CS-2024",
  avatarUrl: "/avatars/john-student.jpg",
  major: "Computer Science",
  group: "Group A",
  isClassLeader: false
};

const mockAchievements: Achievement[] = [
  { 
    id: "1", 
    title: "Programming Contest Winner",
    description: "First place in university programming competition",
    date: "2024-02-20",
    type: "competition",
    status: "approved"
  },
  { 
    id: "2", 
    title: "Research Paper Publication",
    description: "Published research paper on AI algorithms",
    date: "2024-02-15",
    type: "academic",
    status: "pending"
  },
  { 
    id: "3", 
    title: "Open Source Contribution",
    description: "Major contribution to popular open source project",
    date: "2024-02-10",
    type: "project",
    status: "approved"
  }
];

export default function StudentDashboard() {
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  
  const handleRemove = (id: string) => {
    console.log('Removed achievement:', id);
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    // Switch to upload tab with prefilled data
    console.log('Editing achievement:', achievement);
  };

  // Calculate achievement statistics
  const stats = {
    total: mockAchievements.length,
    approved: mockAchievements.filter(a => a.status === 'approved').length,
    pending: mockAchievements.filter(a => a.status === 'pending').length
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      {/* Profile Section */}
      <div className="bg-card rounded-lg shadow-sm">
        <ProfileCard profile={mockProfile} />
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <Upload className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">{stats.approved}</div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">{stats.pending}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Achievements Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="achievements">My Achievements</TabsTrigger>
              <TabsTrigger value="upload">Upload Achievement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="achievements">
              <ScrollArea className="h-[500px] pr-4">
                <AchievementList 
                  achievements={mockAchievements}
                  onRemove={handleRemove}
                  onEdit={handleEdit}
                />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="upload">
              <AchievementForm 
                initialData={editingAchievement}
                onSubmit={(data) => {
                  console.log('Submitted:', data);
                  setEditingAchievement(null);
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
