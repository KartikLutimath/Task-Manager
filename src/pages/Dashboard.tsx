
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KanbanBoard from "@/components/KanbanBoard";
import { useTask } from "@/contexts/TaskContext";
import { format } from "date-fns";
import { CheckCircle2, ClockIcon, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const { tasks } = useTask();
  const [todayTasks, setTodayTasks] = useState(0);
  const [upcomingTasks, setUpcomingTasks] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    let todayCount = 0;
    let upcomingCount = 0;
    let overdueCount = 0;
    let completedCount = 0;
    
    tasks.forEach(task => {
      if (task.status === "done") {
        completedCount++;
        return;
      }
      
      if (task.dueDate) {
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        
        if (dueDate.getTime() === today.getTime()) {
          todayCount++;
        } else if (dueDate.getTime() > today.getTime()) {
          upcomingCount++;
        } else {
          overdueCount++;
        }
      }
    });
    
    setTodayTasks(todayCount);
    setUpcomingTasks(upcomingCount);
    setOverdueTasks(overdueCount);
    setCompletedTasks(completedCount);
  }, [tasks]);
  
  const pendingHighPriorityTasks = tasks.filter(
    task => task.status !== "done" && task.priority === "high"
  ).length;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-muted-foreground">
          {format(new Date(), "EEEE, MMMM do, yyyy")}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Today's Tasks</CardTitle>
            <CardDescription>Tasks due today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{todayTasks}</span>
              <ClockIcon className="h-5 w-5 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming</CardTitle>
            <CardDescription>Future scheduled tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{upcomingTasks}</span>
              <ClockIcon className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Overdue</CardTitle>
            <CardDescription>Tasks past their due date</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{overdueTasks}</span>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Completed</CardTitle>
            <CardDescription>Finished tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{completedTasks}</span>
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Task Overview</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-primary/10">
            Total: {tasks.length}
          </Badge>
          <Badge variant="outline" className="bg-red-500/10 text-red-500">
            High Priority: {pendingHighPriorityTasks}
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="kanban" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban">
          <KanbanBoard />
        </TabsContent>
        <TabsContent value="list">
          <div className="p-8 text-center text-muted-foreground">
            List view will be implemented in a future update.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
