"use client";

import { useTasks } from "@/context/TaskContext";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button";
export function TaskList() {
    const { tasks } = useTasks();
    return (
        <>
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex-1">
                    <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">Due in 3 days</p>
                </div>
                <Button variant="outline" size="sm">
                  Continue
                </Button>
                </CardContent>
              </Card>
            ))}
        </>
    )
}