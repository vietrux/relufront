import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Building2 } from "lucide-react";
import type { AdvisorProfile } from "@/types/advisor";

export function AdvisorProfile({ profile }: { profile: AdvisorProfile }) {
  return (
    <Card className="w-full bg-gradient-to-br from-card to-background border-muted">
      <CardHeader className="flex flex-row items-center gap-6">
        <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-primary/10">
          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`} />
          <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="text-3xl font-bold">{profile.name}</h2>
          <p className="text-lg text-muted-foreground">{profile.role}</p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-sm border border-border/50">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-sm border border-border/50">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p className="font-medium">{profile.department}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
