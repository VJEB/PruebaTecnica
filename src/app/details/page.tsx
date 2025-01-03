import { TaskDetails } from "@/components/custom/TaskDetails";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TaskDetails />
    </Suspense>
  );
}