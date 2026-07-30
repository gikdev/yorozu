import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/phrase-player/editor")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/apps/phrase-player/editor"!</div>
}
