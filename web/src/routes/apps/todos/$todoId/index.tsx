import { btn } from "#/common/atoms/btn"
import { header } from "#/common/atoms/header"
import { extractErrorMessage } from "#/common/helpers/errors"
import { useDeleteTodo } from "#/features/todos/hooks/use-delete-todo"
import { TodoDetailsView } from "#/features/todos/views/todo-details-view"
import { ArrowLeftIcon } from "@phosphor-icons/react"
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

  const handleEdit = () => {
    navigate({ to: "/apps/todos/$todoId/edit", params: { todoId } })
  }

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className={header()}>
        <Link to="/apps/todos" className={btn({ isIcon: true })}>
          <ArrowLeftIcon size={24} />
        </Link>

        <p className="">Todo Details</p>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <TodoDetailsView
          todoId={todoId}
          isDeleteBtnLoading={false}
          isEditBtnLoading={false}
          onDelete={() => deleteTodo(todoId)}
          onEdit={handleEdit}
        />
      </div>
    </div>
  )
}
