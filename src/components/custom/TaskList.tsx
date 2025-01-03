"use client";

import { useTasks } from "@/context/TaskContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Eye, Pencil, Trash, CheckCircle } from 'lucide-react';
import { Task } from "@/schemas/task";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

export function TaskList() {
  const { tasks, updateTask, removeTask } = useTasks();
  const router = useRouter();

  const handleMarkCompleted = (taskId: string) => {
    updateTask({ ...tasks.find(task => task.id === taskId), status: "Completed" } as Task);
  };

  const getDueDateMessage = (dueDate: Date) => {
    const now = new Date();
    if (dueDate < now) return "Past due!";
    return `Due in ${formatDistanceToNow(dueDate)}`
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="flex items-center justify-between gap-4 p-4">
            <div className="flex-1">
              <h3 className={`font-semibold ${task.status === "Completed" ? 'line-through text-muted-foreground' : ''}`}>
                {task.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getDueDateMessage(task.dueDate)}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => router.push(`/details/${task.id}`)}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View Details</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/details?taskId=${task.id}`)}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Edit Task</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => removeTask(task.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete Task</span>
                </DropdownMenuItem>
                {task.status !== "Completed" && (
                  <DropdownMenuItem onClick={() => handleMarkCompleted(task.id)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    <span>Mark as Completed</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}