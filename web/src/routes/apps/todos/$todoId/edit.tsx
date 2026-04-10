import { btn } from "#/common/atoms/btn"
import { EditTodoView } from "#/features/todos/views/edit-todo-view"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/$todoId/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { todoId } = Route.useParams()

  const goToTodoDetails = () =>
    navigate({ to: "/apps/todos/$todoId", params: { todoId } })

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className="flex items-center gap-2 border-b-2 border-mist-800 p-2">
        <Link to="/apps/todos" className={btn({ isIcon: true })}>
          <ArrowLeftIcon size={24} />
        </Link>

        <p className="">Edit Todo</p>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <EditTodoView onFinish={goToTodoDetails} todoId={todoId} />
      </div>
    </div>
  )
}
