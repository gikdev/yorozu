import { btn } from "#/common/atoms/btn"
import { en } from "#/common/i18n/en"
import { CreateTodoView } from "#/features/todos/views/create-todo-view"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className="flex items-center gap-2 border-b-2 border-mist-800 p-2">
        <Link to="/apps/todos" className={btn({ isIcon: true })}>
          <ArrowLeftIcon size={24} />
        </Link>

        <p className="">{en.todos.createNewTitle}</p>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <CreateTodoView />
      </div>
    </div>
  )
}
