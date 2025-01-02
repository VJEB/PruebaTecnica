"use client";

import { useTasks } from "@/context/TaskContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Task } from "@/schemas/task";
export function NewTaskField() {
    const [task, setTask] = useState<Task>({
        id: 0,
        title: "",
        dueDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const { addTask } = useTasks();

    const handleAddTask = () => {
        if (task.title.trim() === "") {
          return; // Prevent adding empty tasks
        }
        addTask(task);
        setTask({
          id: 0,
          title: "",
          dueDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }); // Clear the input field after adding the task
    };
    
    return (
        <>
        <Input
            className="h-12 rounded-lg pl-4 pr-20 text-base"
            placeholder="Enter your task title..."
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
          <div className="absolute right-2 top-2 flex items-center gap-2">
            <Button size="icon" onClick={handleAddTask}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </>
    )
}