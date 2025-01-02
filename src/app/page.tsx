import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TaskList } from "@/components/custom/TaskList";
import { NewTaskField } from "@/components/custom/NewTaskField";

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          TaskFlow
        </Link>
        {/* <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-medium">
            Sign In
          </Link>
          <Button>Sign Up</Button>
        </div> */}
      </header>
      <main className="container mx-auto flex flex-col items-center px-4 py-16">
        <h1 className="mb-12 text-center text-4xl font-bold tracking-tighter sm:text-5xl">
          What would you like to accomplish?
        </h1>
        <div className="relative w-full max-w-2xl">
          <NewTaskField />
        </div>
        <section className="mt-16 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Tasks</h2>
            <Button variant="ghost">View All</Button>
          </div>
          <div className="mt-6 grid gap-4">
            <TaskList />
          </div>
        </section>
      </main>
    </div>
  )
}