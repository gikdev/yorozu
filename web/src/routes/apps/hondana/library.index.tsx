import { createFileRoute } from "@tanstack/react-router"
import { AppBar } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { ContentItemCardsSection } from "#/features/content-items/ContentItemCardsSection"
import { zContentItemFormat } from "#/common/api/client"
import z from "zod"

const librarySearchSchema = z.object({
  q: z.string().catch(""),
  format: zContentItemFormat.optional().catch(undefined),
})

export const Route = createFileRoute("/apps/hondana/library/")({
  validateSearch: librarySearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <title>Library - 本棚</title>

      <AppBar title="Library" />

      <main className="flex-1 flex flex-col overflow-y-auto min-h-0">
        <ContentItemCardsSection />
      </main>
    </AppShell>
  )
}
