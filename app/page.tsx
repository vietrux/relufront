import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 space-y-8">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
          Welcome to RelU
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground">
          Your reliable platform for unified learning experience
        </p>

        <div className="flex flex-col gap-4 items-center">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
