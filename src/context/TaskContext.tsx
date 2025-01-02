"use client";
import { Task } from "@/schemas/task";
import React, { createContext, JSX, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    removeTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Complete project documentation",
    markdownContent: "Write comprehensive documentation for the new feature.",
    dueDate: new Date("2025-01-10"),
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
    priority: "Low",
    status: "In Progress",
  },
  {
    id: uuidv4(),
    title: "Prepare team meeting slides",
    markdownContent: "Include progress updates and key metrics.",
    dueDate: new Date("2025-01-08"),
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-02"),
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: uuidv4(),
    title: "Code review for feature branch",
    markdownContent: "Focus on performance and scalability.",
    dueDate: new Date("2025-01-07"),
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-03"),
    priority: "High",
    status: "In Progress",
  },
];


export const TaskProvider: React.FC<TaskProviderProps> = ({ children }: TaskProviderProps): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Task) => {
    const newTask = { ...task, id: uuidv4() };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => t.id === task.id ? task : t));
  };

  const removeTask = (id: string) => setTasks((prev) => prev.filter((task) => task.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
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
