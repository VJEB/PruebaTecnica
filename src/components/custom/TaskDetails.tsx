"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, ChevronLeft } from 'lucide-react'
import { format } from "date-fns"
import { useEffect, useState } from "react"
import Link from "next/link"
import { PriorityEnum, Task } from "@/schemas/task"
import { useRouter } from "next/navigation"
import { useTasks } from "@/context/TaskContext"
import { useSearchParams } from "next/navigation"

export function TaskDetails() {
    const { tasks, addTask, updateTask } = useTasks();
    const searchParams = useSearchParams();
    const navigate = useRouter();
  
    // Default task state
    const [task, setTask] = useState<Task>({
      id: "0",
      title: "",
      dueDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: "Low",
      status: "In Progress",
    });
  
    // Effect to check and set the task based on the taskId in the URL
    useEffect(() => {
      const taskId = searchParams.get("taskId") || "0";
      console.log(taskId, 'taskId');
      if (taskId === "0") {
        setTask(prevTask => ({
          ...prevTask,
          title: searchParams.get("title") || "New Task",
        }));
      }
      if (taskId !== "0") {
        const existingTask = tasks.find((t) => t.id === taskId);
        if (existingTask) {
          setTask(existingTask);
        }
      }
    }, [searchParams, tasks]);
  
    const handleAddTask = () => {
      if (task.title.trim() === "") {
        return; // Prevent adding empty tasks
      }
      if (task.id === "0") {
        addTask(task);
      } else {
        updateTask(task);
      }
      setTask({
        id: "0",
        title: "",
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        priority: "Low",
        status: "In Progress",
      }); // Clear the input field after adding the task
      navigate.push("/");
    };
    return (
      <div className="min-h-screen bg-background">
        <header className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Dashboard</span>
          </Link>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">{task.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" placeholder="Enter task title" />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  value={task.markdownContent}
                  onChange={(e) => setTask({ ...task, markdownContent: e.target.value })}
                  id="description"
                  placeholder="Enter task description"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={task.priority}
                    onValueChange={(value) => setTask({ ...task, priority: value as PriorityEnum })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {PriorityEnum.options.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {task.dueDate ? format(task.dueDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={task.dueDate}
                        onSelect={(date) => setTask({ ...task, dueDate: date || new Date() })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" onClick={() => navigate.push("/")}>Cancel</Button>
                <Button onClick={handleAddTask}>{task.id === "0" ? "Create Task" : "Update Task"}</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }