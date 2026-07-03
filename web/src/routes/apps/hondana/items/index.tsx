import { createFileRoute, Link, linkOptions } from "@tanstack/react-router"
import { AppBar } from "#/common/molecules/page-header"
import { PlusIcon } from "@phosphor-icons/react"
import { btn } from "#/common/atoms/btn"
import { ItemsGrid } from "./-ItemsGrid"

const TITLE = "Items"

export const Route = createFileRoute("/apps/hondana/items/")({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 mx-auto w-full border-x border-mist-900">
      <title>{TITLE}</title>

      <AppBar title={TITLE} parentPath={linkOptions({ to: "/apps/hondana" })}>
        <Link
          type="button"
          to="/apps/hondana/items/new"
          className={btn({ class: "rounded-none shrink-0", isIcon: true })}
        >
          <PlusIcon size={20} />
        </Link>
      </AppBar>

      <main className="flex-1 flex min-h-0 overflow-y-auto scrollbar-none hover:scrollbar-thin">
        <ItemsGrid />
      </main>
    </div>
  )
}
