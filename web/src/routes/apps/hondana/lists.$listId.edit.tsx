import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/lists/$listId/edit")({
  component: ListEditComponent,
})

function ListEditComponent() {
  const { listId } = useParams({ from: "/apps/hondana/lists/$listId/edit" })
  const navigate = useNavigate()

  const handleSave = () => {
    navigate({ to: "/apps/hondana/lists/$listId", params: { listId } })
  }

  return (
    <div>
      <p>Editing list {listId}</p>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}
