import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/apps/phrase-player/player')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/apps/phrase-player/player"!</div>
}
