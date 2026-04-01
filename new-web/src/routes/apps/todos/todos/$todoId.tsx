import { getTodoOptions } from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { ErrorCard } from "#/common/helpers/error-card"
import { RenderQuery } from "#/common/helpers/render-query"
import { en } from "#/common/i18n/en"
import { TodoDetails } from "#/features/todos/todo-details"
import { useDeleteTodo } from "#/features/todos/use-delete-todo"
import {
  ArrowLeftIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/todos/$todoId")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const { todoId } = Route.useParams()

  const getTodoQ = useQuery(getTodoOptions({ path: { id: todoId } }))

  const [deleteTodo] = useDeleteTodo({
    onError: error => alert(error.message),
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
          <button
            type="button"
            disabled
            className={btn({ isIcon: true })}
            title="Edit Todo"
          >
            <PencilSimpleIcon size={20} />
          </button>

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
        <RenderQuery
          isList={false}
          status={getTodoQ.status}
          loadingView={<p>Loading...</p>}
          successView={<TodoDetails todo={getTodoQ.data!} />}
          errorView={
            <ErrorCard
              message={getTodoQ.error?.message}
              onRetry={getTodoQ.refetch}
            />
          }
        />
      </div>
    </div>
  )
}
