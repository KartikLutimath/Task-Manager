
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Task, Priority } from "@/contexts/TaskContext";
import { Pencil, Trash2, Calendar } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  const priorityColors: Record<Priority, string> = {
    high: "text-red-500 bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/30",
    medium: "text-yellow-500 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30",
    low: "text-green-500 bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30",
  };

  return (
    <Card className={`mb-4 task-card animate-fade-in task-priority-${task.priority}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
          <Badge className={priorityColors[task.priority]}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
        {task.dueDate && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {format(new Date(task.dueDate), "PPP")}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-1 flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
          <Pencil className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
