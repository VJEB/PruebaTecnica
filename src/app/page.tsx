import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from 'lucide-react'
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex h-16 items-center justify-between border-b px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          TaskFlow
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm font-medium">
            Sign In
          </Link>
          <Button>Sign Up</Button>
        </div>
      </header>
      <main className="container mx-auto flex flex-col items-center px-4 py-16">
        <h1 className="mb-12 text-center text-4xl font-bold tracking-tighter sm:text-5xl">
          What would you like to accomplish?
        </h1>
        <div className="relative w-full max-w-2xl">
          <Input
            className="h-12 rounded-lg pl-4 pr-20 text-base"
            placeholder="Enter your task..."
          />
          <div className="absolute right-2 top-2 flex items-center gap-2">
            <Button size="icon">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <section className="mt-16 w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Tasks</h2>
            <Button variant="ghost">View All</Button>
          </div>
          <div className="mt-6 grid gap-4">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex-1">
                  <h3 className="font-semibold">Website Redesign</h3>
                  <p className="text-sm text-muted-foreground">Due in 3 days</p>
                </div>
                <Button variant="outline" size="sm">
                  Continue
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex-1">
                  <h3 className="font-semibold">Content Strategy</h3>
                  <p className="text-sm text-muted-foreground">Due tomorrow</p>
                </div>
                <Button variant="outline" size="sm">
                  Continue
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}