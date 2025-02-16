"use client"

import { useState } from "react";
import { AdvisorProfile } from "@/components/advisor/advisor-profile";
import { ClassList } from "@/components/advisor/class-list";
import { ClassMembersList } from "@/components/class-leader/class-members-list";
import { AchievementReview } from "@/components/class-leader/achievement-review";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AdvisorProfile as IAdvisorProfile, ClassInfo } from "@/types/advisor";
import { ClassMember, AchievementWithFeedback } from "@/types/student";

// Mock data with fit logic, ensuring consistency between advisor, classes, members, and achievements.

// Advisor Profile
const mockAdvisor: IAdvisorProfile = {
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    role: "Academic Advisor",
    department: "Computer Science",
};

// Mock Achievements
const mockAchievements: AchievementWithFeedback[] = [
    {
        id: "1",
        studentId: "1",
        studentName: "John Doe",
        title: "Algorithm Competition Winner",
        description: "First place in university algorithm competition",
        status: "approved",
        date: "2024-01-15T10:00:00Z",
        type: "competition",
        feedback: {
            id: "f1",
            achievementId: "1",
            feedback: "Outstanding performance!",
            reviewedBy: "Dr. Jane Smith",
            reviewedAt: "2024-01-16T10:00:00Z",
        },
    },
    {
        id: "2",
        studentId: "1",
        studentName: "John Doe",
        title: "Participation in Hackathon",
        description: "Student participated in the university hackathon",
        status: "approved",
        date: "2024-02-15T10:00:00Z",
        type: "hackathon",
    },
    {
        id: "3",
        studentId: "2",
        studentName: "Jane Wilson",
        title: "Research Paper",
        description: "Student submitted a research paper on machine learning",
        status: "pending",
        date: "2024-02-20T10:00:00Z",
        type: "research",
        feedback: {
            id: "f2",
            achievementId: "3",
            feedback: "The paper needs more detailed analysis",
            reviewedBy: "Dr. Jane Smith",
            reviewedAt: "2024-02-20T10:00:00Z",
        },
    },
    {
        id: "4",
        studentId: "3",
        studentName: "Alice Brown",
        title: "Coding Competition",
        description: "Student participated in the regional coding competition",
        status: "approved",
        date: "2024-03-01T10:00:00Z",
        type: "competition",
    },
];

// Base member data without computed achievement counts
const rawMembers = [
    {
        name: "John Doe",
        email: "john.doe@university.edu",
        studentId: "1",
        role: "student",
        classId: "CS101",
        isLeader: true,
        avatarUrl: "/avatars/john-doe.jpg",
    },
    {
        name: "Jane Wilson",
        email: "jane.wilson@university.edu",
        studentId: "2",
        role: "student",
        classId: "CS101",
        isLeader: false,
        avatarUrl: "/avatars/jane-wilson.jpg",
    },
    {
        name: "Alice Brown",
        email: "alice.brown@university.edu",
        studentId: "3",
        role: "student",
        classId: "CS101",
        isLeader: false,
        avatarUrl: "/avatars/alice-brown.jpg",
    },
    {
        name: "Bob Martin",
        email: "bob.martin@university.edu",
        studentId: "4",
        role: "student",
        classId: "CS101",
        isLeader: false,
        avatarUrl: "/avatars/bob-martin.jpg",
    },
];

// Utility function to compute achievement summary for a member
function computeAchievements(memberId: string) {
    const achievements = mockAchievements.filter((a) => a.studentId === memberId);
    return {
        totalAchievements: achievements.length,
        pendingAchievements: achievements.filter((a) => a.status === "pending").length,
        approvedAchievements: achievements.filter((a) => a.status === "approved").length,
    };
}

// Enhance rawMembers with computed achievement data
const mockMembers: ClassMember[] = rawMembers.map((member) => {
    const achievements = computeAchievements(member.studentId);
    return {
        ...member,
        ...achievements,
    };
});

// Compute class data based on mockMembers
const mockClasses: ClassInfo[] = [
    {
        id: "CS101",
        name: "Introduction to Programming",
        totalStudents: mockMembers.filter((m) => m.classId === "CS101").length,
        pendingReviews: mockMembers.filter((m) => computeAchievements(m.studentId).pendingAchievements > 0)
            .length,
    },
];

export default function AdvisorDashboard() {
  const [selectedClassId, setSelectedClassId] = useState<string>();
  const [selectedStudentId, setSelectedStudentId] = useState<string>();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle CSV/Excel file upload
      console.log("Uploading file:", file);
    }
  };

  const setClassLeader = (classId: string, studentId: string) => {
    console.log(`Setting student ${studentId} as leader for class ${classId}`);
    // Implement leader setting logic
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-7xl">
      {/* Profile Section */}
      <div className="bg-card rounded-lg shadow-sm">
        <AdvisorProfile profile={mockAdvisor} />
      </div>
      
      {/* Upload Button Section */}
      <div className="flex justify-end sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="shadow-sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload Student List
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Upload Student List</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Class List Section */}
        <div className="lg:col-span-3 h-[calc(100vh-250px)] overflow-y-auto rounded-lg border bg-card p-4">
          <div className="min-w-0"> {/* Add this wrapper */}
            <h3 className="font-semibold mb-4 text-lg">Classes</h3>
            <ClassList
              classes={mockClasses}
              onSelectClass={setSelectedClassId}
              selectedClassId={selectedClassId}
            />
          </div>
        </div>
        
        {/* Members List Section */}
        {selectedClassId && (
          <div className="lg:col-span-4 h-[calc(100vh-250px)] overflow-y-auto rounded-lg border bg-card p-4">
            <ClassMembersList
              members={mockMembers}
              onSelectMember={setSelectedStudentId}
              selectedMemberId={selectedStudentId}
              onSetLeader={(studentId) => setClassLeader(selectedClassId, studentId)}
              userRole="advisor"  // Add this line
            />
          </div>
        )}
        
        {/* Achievements Section */}
        <div className="lg:col-span-5 h-[calc(100vh-250px)] overflow-y-auto rounded-lg border bg-card p-4">
          <div className="space-y-4">
            {selectedStudentId ? (
              mockAchievements
                .filter(a => a.studentId === selectedStudentId)
                .map(achievement => (
                  <AchievementReview
                    key={achievement.id}
                    achievement={achievement}
                    onApprove={(id) => console.log('Approved:', id)}
                    onReject={(id, feedback) => console.log('Rejected:', id, feedback)}
                    userRole="advisor"
                  />
                ))
            ) : (
              <div className="text-center text-muted-foreground p-4">
                Select a student to view achievements
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
