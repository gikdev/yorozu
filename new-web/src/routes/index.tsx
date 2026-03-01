import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <h1>Hello from TanStack Router!</h1>
      <p>Welcome to your new project.</p>
    </div>
  )
}
