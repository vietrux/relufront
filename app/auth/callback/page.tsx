import { Skeleton } from "@/components/ui/skeleton";

export default function AuthenticationCallback() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-center">
            Authenticating...
          </h1>
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    </div>
  );
}
