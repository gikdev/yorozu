import { ChronoTrackPage, localStorageAdapter } from "#/features/ChronoTrack"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/chrono-track")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ChronoTrackPage storage={localStorageAdapter} backHref="/apps" />
}
