import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { NewContentItemSection } from "#/features/content-items/NewContentItemSection"
import { createFileRoute, linkOptions } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/library/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <PageHeader
        title="New Content Item"
        left={
          <PageHeaderBackButton
            to={
              linkOptions({ to: "/apps/hondana/library", search: { q: "" } }).to
            }
          />
        }
      />

      <main className="flex-1 p-4 overflow-y-auto min-h-0 flex flex-col">
        <NewContentItemSection />
      </main>
    </AppShell>
  )
}
