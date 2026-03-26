import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/apps/todos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/apps/todos/"!</div>
}
