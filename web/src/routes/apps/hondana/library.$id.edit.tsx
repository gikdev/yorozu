import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { EditContentItemSection } from "#/features/content-items/EditContentItemSection"
import { createFileRoute, linkOptions } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/library/$id/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <AppShell>
      <title>Edit Content Item - 本棚</title>

      <PageHeader
        title="Edit Content Item"
        left={
          <PageHeaderBackButton
            to={
              linkOptions({ to: "/apps/hondana/library", search: { q: "" } }).to
            }
          />
        }
      />

      <main className="flex-1 p-4 overflow-y-auto min-h-0 flex flex-col">
        <EditContentItemSection contentItemId={id} />
      </main>
    </AppShell>
  )
}
