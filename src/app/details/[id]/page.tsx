"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronLeft, Clock, Flag } from "lucide-react";
import Link from "next/link";
import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";

export default function TaskDetails({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise); // Unwrap the params promise
  const { tasks, updateTask } = useTasks(); // Get tasks from context
  const task = tasks.find((task) => task.id === params.id); // Find the task by ID
  const router = useRouter();

  // If task is not found, you can redirect or show a message
  if (!task) {
    router.push("/"); // Redirect to the dashboard if task is not found
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center border-b px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeft className="h-5 w-5" />
          <span className="font-semibold">Back to Dashboard</span>
        </Link>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
            <Badge variant={task.status === "Completed" ? "default" : "secondary"}>
              {task.status}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p>{task.markdownContent}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Flag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Priority:</span>
                <Badge
                  variant={
                    task.priority === "High"
                      ? "destructive"
                      : task.priority === "Medium"
                      ? "default"
                      : "secondary"
                  }
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Due Date:</span>
                <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Created:</span>
                    <span className="font-medium">{new Date(task.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Last Updated:</span>
                    <span className="font-medium">{new Date(task.updatedAt).toLocaleString()}</span>
                </div>
            </div>
            <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => router.push(`/details?taskId=${task.id}`)}>Edit Task</Button>
                <Button
                    onClick={() => {
                        const newStatus = task.status === "Completed" ? "In Progress" : "Completed"; // Toggle the status
                        updateTask({ ...task, status: newStatus }); // Update the task with the new status
                    }}
                >
                    {task.status === "Completed" ? "Mark as In Progress" : "Mark as Completed"}
                </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}