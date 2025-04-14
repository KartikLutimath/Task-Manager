
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "./AuthContext";

export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string | null;
  assignedTo: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

type TaskContextType = {
  tasks: Task[];
  createTask: (task: Omit<Task, "id" | "createdBy" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByStatus: (status: Status) => Task[];
  predictTaskPriority: (title: string, description: string, dueDate: string | null) => Promise<Priority>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // Add some demo tasks if no tasks exist
      if (user) {
        const demoTasks: Task[] = [
          {
            id: "1",
            title: "Complete project proposal",
            description: "Draft the initial project proposal for client review",
            status: "todo",
            priority: "high",
            dueDate: new Date(Date.now() + 86400000).toISOString(), // tomorrow
            assignedTo: user.id,
            createdBy: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: "2",
            title: "Research market competitors",
            description: "Analyze key competitors and their product offerings",
            status: "in-progress",
            priority: "medium",
            dueDate: new Date(Date.now() + 172800000).toISOString(), // day after tomorrow
            assignedTo: user.id,
            createdBy: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          {
            id: "3",
            title: "Schedule team meeting",
            description: "Set up weekly sync with the development team",
            status: "done",
            priority: "low",
            dueDate: new Date(Date.now() - 86400000).toISOString(), // yesterday
            assignedTo: user.id,
            createdBy: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        setTasks(demoTasks);
        localStorage.setItem("tasks", JSON.stringify(demoTasks));
      }
    }
  }, [user]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const createTask = (task: Omit<Task, "id" | "createdBy" | "createdAt" | "updatedAt">) => {
    if (!user) return;
    
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdBy: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast.success("Task created successfully");
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            } 
          : task
      )
    );
    toast.success("Task updated successfully");
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.success("Task deleted successfully");
  };

  const getTasksByStatus = (status: Status) => {
    return tasks.filter(task => task.status === status);
  };

  // This function simulates AI prioritization - in a real app, you would call an API
  const predictTaskPriority = async (
    title: string, 
    description: string, 
    dueDate: string | null
  ): Promise<Priority> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple prioritization logic based on keywords and due date
    const combinedText = (title + " " + description).toLowerCase();
    const urgentKeywords = ['urgent', 'asap', 'immediately', 'critical', 'high priority'];
    const mediumKeywords = ['important', 'needed', 'significant', 'moderate'];
    
    // Check if any urgent keywords are present
    if (urgentKeywords.some(keyword => combinedText.includes(keyword))) {
      return "high";
    }
    
    // Check due date - if it's within 2 days, high priority
    if (dueDate) {
      const daysUntilDue = Math.floor(
        (new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      
      if (daysUntilDue <= 2) {
        return "high";
      } else if (daysUntilDue <= 5) {
        return "medium";
      }
    }
    
    // Check if any medium keywords are present
    if (mediumKeywords.some(keyword => combinedText.includes(keyword))) {
      return "medium";
    }
    
    // Default to low priority
    return "low";
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      createTask,
      updateTask,
      deleteTask,
      getTasksByStatus,
      predictTaskPriority
    }}>
      {children}
    </TaskContext.Provider>
  );
};
