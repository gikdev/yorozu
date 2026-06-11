import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { BottomNav } from "../-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { Fab } from "#/common/molecules/Fab"
import { ContentItemCardsSection } from "#/features/content-items/ContentItemCardsSection"

export const Route = createFileRoute("/apps/hondana/library/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <PageHeader title="Library" />
      <ContentItemCardsSection />
      <BottomNav activeTabId="library" />
    </AppShell>
  )
}
