import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { BottomNav } from "../-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { sampleContentItems } from "#/features/content-items/ContentItemShape"
import { ContentItemCard } from "#/features/content-items/ContentItemCard/ContentItemCard"
import { Fab } from "#/common/molecules/Fab"

export const Route = createFileRoute("/apps/hondana/library/")({
  component: RouteComponent,
})

function RouteComponent() {
  // TODO: Add fetching, loading & error states, when the corresponding API endpoint got ready.

  return (
    <AppShell>
      <PageHeader title="Library" />

      <main className="flex-1 p-4 overflow-y-auto min-h-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {sampleContentItems.map(ci => (
          <ContentItemCard key={ci.id} {...ci} onDetails={() => {}} />
        ))}
      </main>

      <BottomNav activeTabId="library" />

      <Fab
        bottom={80}
        right={24}
        type="link"
        to={linkOptions({ to: "/apps/hondana/library/new" }).to}
      />
    </AppShell>
  )
}
