import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { ContentItemDetailsSection } from "#/features/content-items/ContentItemDetailsSection"
import { createFileRoute, linkOptions } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/library/$id/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <AppShell>
      <PageHeader
        title="Details"
        left={
          <PageHeaderBackButton
            to={linkOptions({ to: "/apps/hondana/library", search: { q: "" } }).to}
          />
        }
      />

      <main className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-6 p-4">
        <ContentItemDetailsSection contentItemId={id} />
      </main>
    </AppShell>
  )
}
