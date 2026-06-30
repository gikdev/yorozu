import { createFileRoute } from "@tanstack/react-router"
import { AppBar } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { ConsumptionTracksSection } from "#/features/consumption-tracks/ConsumptionTracksSection"
import { z } from "zod"
import { zIntentionType } from "#/common/api/client"

const tracksSearchSchema = z.object({
  q: z.string().catch(""),
  intention: zIntentionType.optional().catch(undefined),
})

export const Route = createFileRoute("/apps/hondana/tracks/")({
  validateSearch: tracksSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <title>Tracks - 本棚</title>

      <AppBar title="Tracks" />

      <main className="flex-1 flex flex-col overflow-y-auto min-h-0">
        <ConsumptionTracksSection />
      </main>
    </AppShell>
  )
}
