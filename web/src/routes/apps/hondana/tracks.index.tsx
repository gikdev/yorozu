import { createFileRoute } from "@tanstack/react-router"
import { BottomNav } from "./-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { ConsumptionTracksSection } from "#/features/consumption-tracks/ConsumptionTracksSection"

export const Route = createFileRoute("/apps/hondana/tracks/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <PageHeader title="Tracks" />

      <main className="flex-1 flex flex-col overflow-y-auto min-h-0">
        <ConsumptionTracksSection />
      </main>

      <BottomNav activeTabId="tracks" />
    </AppShell>
  )
}
