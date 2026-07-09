import { createFileRoute } from '@tanstack/react-router'
import { TempWelcomeScreen } from '#/features/TempWelcomeScreen'

export const Route = createFileRoute('/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TempWelcomeScreen />
}
