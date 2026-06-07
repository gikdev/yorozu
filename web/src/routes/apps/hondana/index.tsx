import { createFileRoute } from "@tanstack/react-router"
import { fullPage } from "#/common/atoms/full-page"
import { phonePage } from "#/common/atoms/phone-page"
import { BottomNav } from "./-common/BottomNav"

export const Route = createFileRoute("/apps/hondana/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={fullPage()}>
      <div className={phonePage()}>
        <header className="bg-mist-950 border-b-2 border-mist-900 min-h-16 flex justify-center items-center">
          <span className="text-mist-50 font-bold text-2xl">本棚</span>
        </header>

        <main className="flex-1">ljkasdlkfj</main>

        <BottomNav activeTabId="home" />
      </div>
    </div>
  )
}
