import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { BottomNav } from "../-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"
import { AppShell } from "#/common/molecules/AppShell"
import { ContentItemCard } from "#/features/content-items/ContentItemCard/ContentItemCard"
import { Fab } from "#/common/molecules/Fab"
import { useQuery } from "@tanstack/react-query"
import { listContentItemsOptions } from "#/common/api/client"

export const Route = createFileRoute("/apps/hondana/library/")({
  component: RouteComponent,
})

function RouteComponent() {
  const contentItemsQuery = useQuery(listContentItemsOptions())

  return (
    <AppShell>
      <PageHeader title="Library" />

      {contentItemsQuery.isSuccess && (
        <main className="flex-1 p-4 overflow-y-auto min-h-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {contentItemsQuery.data.items.map(ci => (
            <ContentItemCard
              key={ci.id}
              coverImageUrl={ci.coverImageUrl}
              format={ci.format}
              hasAnyTracks={ci.hasAnyTracks}
              id={ci.id}
              isBookmarked={ci.isBookmarked}
              isFavorite={ci.isFavorite}
              isOngoing={ci.unitSpec?.isOngoing ?? null}
              isSecret={ci.isSecret}
              placeholderLetter={ci.placeholderLetter}
              title={ci.title}
              onDetails={() => {}}
            />
          ))}
        </main>
      )}

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
