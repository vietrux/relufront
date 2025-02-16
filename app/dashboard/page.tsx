import { Card } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl" />
          <div className="relative space-y-2 p-6">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Student Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your progress and manage your courses
            </p>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-2">
              <h3 className="font-semibold text-xl">Current Progress</h3>
              <div className="h-2 bg-secondary rounded-full">
                <div className="h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full w-[75%]" />
              </div>
              <p className="text-sm text-muted-foreground">75% Complete</p>
            </div>
          </Card>

          {/* Recent Activity Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Recent Activity</h3>
              <ul className="space-y-3">
                {['Completed Quiz', 'Submitted Assignment', 'Joined Discussion'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Upcoming Tasks Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">Upcoming Tasks</h3>
              <div className="space-y-3">
                {['Math Quiz', 'Science Project', 'Literature Essay'].map((task, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{task}</span>
                    <span className="text-xs text-muted-foreground">Due soon</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
