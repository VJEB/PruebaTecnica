"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export function NewTaskField() {
    const [taskTitle, setTaskTitle] = useState<string>("");

    const navigate = useRouter();

    const handleAddTask = () => {
        if (taskTitle.trim() === "") {
            return; // Prevent adding empty tasks
        }
        navigate.push(`/details?title=${encodeURIComponent(taskTitle)}`);
        setTaskTitle(""); // Clear the input field after navigating
    };
    
    return (
        <>
        <Input
            className="h-12 rounded-lg pl-4 pr-20 text-base"
            placeholder="Enter your task title..."
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <div className="absolute right-2 top-2 flex items-center gap-2">
            <Button size="icon" onClick={handleAddTask}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </>
    )
}