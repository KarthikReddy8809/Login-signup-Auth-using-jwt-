import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section >
      <h1 className="text-2xl font-bold text-center mb-4 mt-10">Welcome to the Home Page</h1>
      <p className="text-center">This is the home page of our application.</p>

    </section>
  )
}
