import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { TrackDetailsSection } from "#/features/consumption-tracks/TrackDetailsSection"
import { createFileRoute, linkOptions } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/tracks/$id/")({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return (
    <AppShell>
      <PageHeader
        title="Track Details"
        left={
          <PageHeaderBackButton
            to={linkOptions({ to: "/apps/hondana/tracks", search: { q: "" } }).to}
          />
        }
      />

      <main className="flex-1 p-4 overflow-y-auto min-h-0 flex flex-col">
        <TrackDetailsSection trackId={id} />
      </main>
    </AppShell>
  )
}
