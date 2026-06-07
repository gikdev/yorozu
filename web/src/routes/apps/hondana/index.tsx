import { createFileRoute } from "@tanstack/react-router"
import { fullPage } from "#/common/atoms/full-page"
import { phonePage } from "#/common/atoms/phone-page"
import { BottomNav } from "./-common/BottomNav"
import { PageHeader } from "#/common/molecules/page-header"

export const Route = createFileRoute("/apps/hondana/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className={fullPage()}>
      <div className={phonePage()}>
        <PageHeader title="本棚" />

        <main className="flex-1">ljkasdlkfj</main>

        <BottomNav activeTabId="home" />
      </div>
    </div>
  )
}
