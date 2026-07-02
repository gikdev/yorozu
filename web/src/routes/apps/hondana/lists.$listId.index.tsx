import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/lists/$listId/")({
  component: ListDetailComponent,
})

function ListDetailComponent() {
  const { listId } = Route.useParams()

  return <p>List ID: {listId}</p>
}
