import { DigitalCard } from "#/features/digital-card"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <DigitalCard />
}
