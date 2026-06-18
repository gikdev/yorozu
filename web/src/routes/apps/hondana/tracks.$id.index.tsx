import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/tracks/$id/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/apps/hondana/tracks/$id/"!</div>
}
