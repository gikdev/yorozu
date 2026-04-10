import { btn } from "#/common/atoms/btn"
import { extractErrorMessage } from "#/common/helpers/errors"
import { en } from "#/common/i18n/en"
import { useDeleteTodo } from "#/features/todos/hooks/use-delete-todo"
import { TodoDetailsView } from "#/features/todos/views/todo-details-view"
import {
  ArrowLeftIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/$todoId/")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { todoId } = Route.useParams()
  const [deleteTodo] = useDeleteTodo({
    onError: error => alert(extractErrorMessage(error)),
    onSuccess: () => {
      navigate({ to: "/apps/todos" })
    },
  })

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className="flex items-center gap-2 border-b-2 border-mist-800 p-2">
        <Link to="/apps/todos" className={btn({ isIcon: true })}>
          <ArrowLeftIcon size={24} />
        </Link>

        <p className="">{en.todos.todoDetailsTitle}</p>

        <div className="flex items-center ms-auto">
          <Link
            to="/apps/todos/$todoId/edit"
            params={{ todoId }}
            className={btn({ isIcon: true })}
            title="Edit Todo"
          >
            <PencilSimpleIcon size={20} />
          </Link>

          <button
            type="button"
            className={btn({ isIcon: true })}
            title="Delete Todo"
            onClick={() => deleteTodo(todoId)}
          >
            <TrashIcon size={20} />
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <TodoDetailsView todoId={todoId} />
      </div>
    </div>
  )
}
