
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { useTask, Task, Status } from "@/contexts/TaskContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskForm from "./TaskForm";
import { Plus } from "lucide-react";

const KanbanBoard: React.FC = () => {
  const { getTasksByStatus, updateTask, deleteTask, createTask } = useTask();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);

  // Get tasks by status
  const todoTasks = getTasksByStatus("todo");
  const inProgressTasks = getTasksByStatus("in-progress");
  const doneTasks = getTasksByStatus("done");

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    
    // If there's no destination or the item was dropped back in the same place
    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }
    
    // Get the new status based on the destination droppableId
    const newStatus = destination.droppableId as Status;
    
    // Update the task with the new status
    updateTask(draggableId, { status: newStatus });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleTaskFormSubmit = (data: Omit<Task, "id" | "createdBy" | "createdAt" | "updatedAt">) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      setEditingTask(null);
    } else {
      createTask(data);
      setIsNewTaskDialogOpen(false);
    }
  };

  const closeTaskForm = () => {
    setEditingTask(null);
    setIsNewTaskDialogOpen(false);
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <Button onClick={() => setIsNewTaskDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div>
            <h3 className="font-medium text-lg mb-3">To Do</h3>
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {todoTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {todoTasks.length === 0 && (
                    <div className="text-center p-4 text-muted-foreground">
                      No tasks to do
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>

          {/* In Progress Column */}
          <div>
            <h3 className="font-medium text-lg mb-3">In Progress</h3>
            <Droppable droppableId="in-progress">
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {inProgressTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {inProgressTasks.length === 0 && (
                    <div className="text-center p-4 text-muted-foreground">
                      No tasks in progress
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>

          {/* Done Column */}
          <div>
            <h3 className="font-medium text-lg mb-3">Done</h3>
            <Droppable droppableId="done">
              {(provided) => (
                <div
                  className="kanban-column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {doneTasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {doneTasks.length === 0 && (
                    <div className="text-center p-4 text-muted-foreground">
                      No completed tasks
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>

      {/* Task Edit Dialog */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <TaskForm
              task={editingTask}
              onSubmit={handleTaskFormSubmit}
              onCancel={closeTaskForm}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* New Task Dialog */}
      <Dialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <TaskForm
            onSubmit={handleTaskFormSubmit}
            onCancel={closeTaskForm}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KanbanBoard;
