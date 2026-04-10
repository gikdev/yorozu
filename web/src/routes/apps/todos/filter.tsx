import { btn } from "#/common/atoms/btn"
import { useTodoQueryStore } from "#/features/todos/hooks/use-todo-query-store"
import { TodoListFilterView } from "#/features/todos/views/todo-list-filter-view"
import { ArrowLeftIcon, FunnelXIcon } from "@phosphor-icons/react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/filter")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const queryStore = useTodoQueryStore()

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className="flex items-center gap-2 border-b-2 border-mist-800 p-2">
        <Link to="/apps/todos" className={btn({ isIcon: true })}>
          <ArrowLeftIcon size={24} />
        </Link>

        <p className="">Filters</p>

        <button
          type="button"
          onClick={queryStore.reset}
          disabled={!queryStore.hasFilter()}
          className={btn({ isIcon: true, className: "ms-auto" })}
        >
          <FunnelXIcon size={24} />
        </button>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <TodoListFilterView onSubmit={() => navigate({ to: "/apps/todos" })} />
      </div>
    </div>
  )
}
