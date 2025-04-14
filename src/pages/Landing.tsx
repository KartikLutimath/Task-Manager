
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCheck, ClipboardCheck, Clock, Brain } from "lucide-react";

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm border">
      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Priority Task Pilot
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Manage your tasks with AI-powered prioritization. Stay organized, collaborate in real-time, and never miss a deadline again.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <div className="relative p-4 bg-background rounded-lg border shadow-lg">
                <div className="grid gap-4">
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
                    <div className="flex-1">
                      <h3 className="font-medium">High Priority</h3>
                      <p className="text-sm text-muted-foreground">Client presentation</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Today</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold">2</div>
                    <div className="flex-1">
                      <h3 className="font-medium">Medium Priority</h3>
                      <p className="text-sm text-muted-foreground">Team meeting</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Tomorrow</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">3</div>
                    <div className="flex-1">
                      <h3 className="font-medium">Low Priority</h3>
                      <p className="text-sm text-muted-foreground">Update documentation</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Next week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover how Priority Task Pilot helps you stay organized and focused
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pt-12">
            <Feature
              icon={<Brain className="h-6 w-6 text-primary" />}
              title="AI Prioritization"
              description="Smart task prioritization based on due dates, descriptions, and workload"
            />
            <Feature
              icon={<ClipboardCheck className="h-6 w-6 text-primary" />}
              title="Task Management"
              description="Create, assign, and track tasks with our intuitive interface"
            />
            <Feature
              icon={<Clock className="h-6 w-6 text-primary" />}
              title="Deadline Tracking"
              description="Never miss a deadline with clear visual indicators and reminders"
            />
            <Feature
              icon={<CheckCheck className="h-6 w-6 text-primary" />}
              title="Kanban Board"
              description="Visualize your workflow with our drag-and-drop kanban interface"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Boost Your Productivity?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of users who trust Priority Task Pilot to manage their tasks
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/signup">
                <Button size="lg">Get Started Today</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; 2025 Priority Task Pilot. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="#" className="hover:underline">
              Terms
            </Link>
            <Link to="#" className="hover:underline">
              Privacy
            </Link>
            <Link to="#" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
