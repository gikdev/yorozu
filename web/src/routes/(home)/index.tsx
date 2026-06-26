import { TempWelcomeScreen } from "#/features/TempWelcomeScreen"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  // TODO: Re-build the homepage... properly this time...
  // return <DigitalCard />
  return <TempWelcomeScreen />
}
