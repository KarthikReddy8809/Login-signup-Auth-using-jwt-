import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section>
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to the Home Page</h1>
      <p className="text-center">This is the home page of our application.</p>
      <div className="flex flex-row justify-evenly mt-10">
        <a href="/login" className="text-blue-500 hover:underline">Login</a>
        <a href="/signup" className="text-blue-500 hover:underline">Signup</a>
      </div>

    </section>
  )
}
