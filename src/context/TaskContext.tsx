"use client";
import { Task } from "@/schemas/task";
import React, { createContext, JSX, ReactNode, useContext, useState } from "react";


interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete project documentation",
    markdownContent: "Write comprehensive documentation for the new feature.",
    dueDate: new Date("2025-01-10"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
  {
    id: 2,
    title: "Prepare team meeting slides",
    markdownContent: "Include progress updates and key metrics.",
    dueDate: new Date("2025-01-08"),
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-02"),
  },
  {
    id: 3,
    title: "Code review for feature branch",
    markdownContent: "Focus on performance and scalability.",
    dueDate: new Date("2025-01-07"),
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-03"),
  },
];


export const TaskProvider: React.FC<TaskProviderProps> = ({ children }: TaskProviderProps): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook for using the TaskContext
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
