import { createFileRoute, Link, linkOptions } from "@tanstack/react-router"
import { AppBar } from "#/common/molecules/page-header"
import { ArrowRightIcon } from "@phosphor-icons/react"
import { ListCard } from "./-ListCard"
import { fakeListOfLists } from "./-fakeListOfLists"
import { btn } from "#/common/atoms/btn"

const TITLE = "本棚"

export const Route = createFileRoute("/apps/hondana/")({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full">
      <AppBar title={TITLE} parentPath={linkOptions({ to: "/apps" })} />

      <main className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0">
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-mist-100 font-bold text-lg">Lists</span>

            <Link
              search={{ q: "" }}
              to="/apps/hondana/library"
              className={btn({ theme: "ghost", size: "sm", class: "flex-1 justify-end" })}
            >
              See all
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 *:flex-1">
            {fakeListOfLists.map((list) => (
              <ListCard
                key={list.id}
                title={list.title}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
