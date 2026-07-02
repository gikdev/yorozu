import { createFileRoute, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/hondana/lists/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleSave = () => {
    navigate({ to: "/apps/hondana/lists" })
  }

  return (
    <div>
      <p>Creating new list</p>
      <button onClick={handleSave}>Save</button>
    </div>
  )
}
