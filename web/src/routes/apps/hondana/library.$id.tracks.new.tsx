import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { NewConsumptionTrackSection } from "#/features/consumption-tracks/NewConsumptionTrackSection"
import { createFileRoute, linkOptions } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/library/$id/tracks/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()

  return (
    <AppShell>
      <title>New Consumption Track - 本棚</title>

      <PageHeader
        title="New Consumption Track"
        left={
          <PageHeaderBackButton
            to={linkOptions({ to: "/apps/hondana/library/$id", params }).to}
          />
        }
      />

      <main className="flex-1 p-4 overflow-y-auto min-h-0 flex flex-col">
        <NewConsumptionTrackSection contentItemId={params.id} />
      </main>
    </AppShell>
  )
}
