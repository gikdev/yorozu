import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { BottomNav } from "./-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { ContentItemCardsSection } from "#/features/content-items/ContentItemCardsSection"

export const Route = createFileRoute("/apps/hondana/library/")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  return (
    <AppShell>
      <PageHeader title="Library" />
      <div className="relative flex-1 flex flex-col min-h-0">
        <ContentItemCardsSection
          onItemDetails={id =>
            navigate({ to: "/apps/hondana/library/$id", params: { id } })
          }
        />
      </div>
      <BottomNav activeTabId="library" />
    </AppShell>
  )
}
