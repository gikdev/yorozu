import { createFileRoute } from "@tanstack/react-router"
import { BottomNav } from "./-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { ContentItemCardsSection } from "#/features/content-items/ContentItemCardsSection"

export const Route = createFileRoute("/apps/hondana/library/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <PageHeader title="Library" />

      <main className="flex-1 flex flex-col overflow-y-auto min-h-0">
        <ContentItemCardsSection />
      </main>

      <BottomNav activeTabId="library" />
    </AppShell>
  )
}
