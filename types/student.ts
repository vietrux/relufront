export interface StudentProfile {
  name: string;
  email: string;
  studentId: string;
  role: string;
  classId: string;
  avatarUrl?: string;
  major?: string;
  group?: string;
  isClassLeader?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  files?: AchievementFile[];
}

export interface AchievementFile {
  id: string;
  name: string;
  url: string;
  type: string; // 'image' | 'pdf' | 'document'
  size: number;
}

export type AchievementStatus = Achievement['status'];
export type AchievementType = 'academic' | 'sports' | 'arts' | 'other';

export interface ClassMember extends StudentProfile {
  avatarUrl?: string;
  totalAchievements: number;
  pendingAchievements: number;
  isLeader?: boolean;  // Add this field
  approvedAchievements: number;  // Add this field
}

export interface AchievementFeedback {
  id: string;
  achievementId: string;
  feedback: string;
  reviewedBy: string;
  reviewedAt: string;
}

export interface AchievementWithFeedback extends Achievement {
  feedback?: AchievementFeedback;
  studentName: string;
  studentId: string;
}
