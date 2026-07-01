import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { AppBar } from "#/common/molecules/page-header"
import { HondanaCategoryNav } from "#/features/hondana/HondanaCategoryNav"
import { ListsCarousel } from "./-ListsCarousel"

const TITLE = "本棚"

export const Route = createFileRoute("/apps/hondana/")({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full">
      <title>{TITLE}</title>

      <AppBar title={TITLE} parentPath={linkOptions({ to: "/apps" })} />

      <main className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0">
        <ListsCarousel />
        <HondanaCategoryNav />
      </main>
    </div>
  )
}
