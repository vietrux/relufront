export interface AdvisorProfile {
  name: string;
  email: string;
  role: string;
  department: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  totalStudents: number;
  pendingReviews: number;
}