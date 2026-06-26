import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { EditTrackSection } from "#/features/consumption-tracks/EditTrackSection"
import { createFileRoute, linkOptions } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/tracks/$id/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <AppShell>
      <title>Edit Track - 本棚</title>

      <PageHeader
        title="Edit Track"
        left={
          <PageHeaderBackButton
            to={
              linkOptions({ to: "/apps/hondana/tracks", search: { q: "" } }).to
            }
          />
        }
      />

      <main className="flex-1 p-4 overflow-y-auto min-h-0 flex flex-col">
        <EditTrackSection trackId={id} />
      </main>
    </AppShell>
  )
}
