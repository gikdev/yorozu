import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/time-log")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/apps/time-log"!</div>
}
