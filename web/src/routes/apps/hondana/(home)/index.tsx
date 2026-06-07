import { createFileRoute } from "@tanstack/react-router"
import { BottomNav } from "../-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { ConsumptionTracksView } from "#/features/consumption-tracks/ConsumptionTracksView"

export const Route = createFileRoute("/apps/hondana/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <PageHeader title="本棚" />

      <main className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0">
        <ConsumptionTracksView />
      </main>

      <BottomNav activeTabId="home" />
    </AppShell>
  )
}
