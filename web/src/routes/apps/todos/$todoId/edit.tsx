import { btn } from "#/common/atoms/btn"
import { fullPage } from "#/common/atoms/full-page"
import { header } from "#/common/atoms/header"
import { phonePage } from "#/common/atoms/phone-page"
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
    <div className={fullPage()}>
      <div className={phonePage()}>
        <header className={header()}>
          <Link to="/apps/todos" className={btn({ isIcon: true })}>
            <ArrowLeftIcon size={24} />
          </Link>

          <p>Edit Todo</p>
        </header>

        <main className="flex-1 flex flex-col p-4">
          <EditTodoView onFinish={goToTodoDetails} todoId={todoId} />
        </main>
      </div>
    </div>
  )
}
