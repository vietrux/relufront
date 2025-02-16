import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Hardcoded role for development - should match middleware
const MOCK_USER_ROLE = 'class-leader';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link href={`/dashboard/${MOCK_USER_ROLE}`} className="text-xl font-bold hover:text-primary transition-colors">
              RelU Dashboard
            </Link>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Role: {MOCK_USER_ROLE}
              </p>
              <Button variant="outline" asChild>
                <Link href="/">
                  Logout
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6 bg-background/50">
        {children}
      </div>
    </div>
  );
}
