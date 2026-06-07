import { createFileRoute } from "@tanstack/react-router"
import { BottomNav } from "../-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { sampleContentItems } from "#/features/content-items/ContentItemShape"
import { ContentItemCard } from "#/features/content-items/ContentItemCard/ContentItemCard"

export const Route = createFileRoute("/apps/hondana/library/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <PageHeader title="Library" />

      <main className="flex-1 p-4 overflow-y-auto min-h-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {sampleContentItems.map(ci => (
          <ContentItemCard key={ci.id} {...ci} onDetails={() => {}} />
        ))}
      </main>

      <BottomNav activeTabId="library" />
    </AppShell>
  )
}
