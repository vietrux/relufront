import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StudentProfile } from "@/types/student";
import { Mail, GraduationCap, Users, School } from "lucide-react";

interface ProfileCardProps {
  profile: StudentProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card className="bg-card overflow-hidden">
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative">
            {/* Avatar Section */}
            <Avatar className="h-20 w-20 border-4 border-background">
              <AvatarImage src={profile.avatarUrl} />
              <AvatarFallback className="text-xl">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>

            {/* Info Section */}
            <div className="space-y-4 flex-1">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <Badge variant="secondary" className="ml-2">
                    {profile.role}
                  </Badge>
                </div>
                <p className="text-muted-foreground">Student ID: {profile.studentId}</p>
              </div>

              {/* Contact & Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <School className="h-4 w-4" />
                  <span className="text-sm">Class ID: {profile.classId}</span>
                </div>
                {profile.major && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span className="text-sm">{profile.major}</span>
                  </div>
                )}
                {profile.group && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Group: {profile.group}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-2 md:self-start">
              {profile.isClassLeader && (
                <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20">
                  Class Leader
                </Badge>
              )}
              <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
