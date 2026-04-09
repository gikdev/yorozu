import { btn } from "#/common/atoms/btn"
import {
  TodoListFilterForm,
  type TodoListFilterFormData,
} from "#/features/todos/views/todo-list-filter-form"
import {
  useTodoQueryStore,
  type TodoQueryState,
} from "#/features/todos/hooks/use-todo-query-store"
import { ArrowLeftIcon, FunnelXIcon } from "@phosphor-icons/react"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/filter")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const queryStore = useTodoQueryStore()

  const defaultValues: TodoListFilterFormData =
    map.queryStore.to.todoListFilterFormData(queryStore)

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className="flex items-center gap-2 border-b-2 border-mist-800 p-2">
        <Link to="/apps/todos" className={btn({ isIcon: true })}>
          <ArrowLeftIcon size={24} />
        </Link>

        <p className="">Filters</p>

        <button
          type="button"
          disabled={!queryStore.hasFilter()}
          onClick={() => queryStore.reset()}
          className={btn({ isIcon: true, className: "ms-auto" })}
        >
          <FunnelXIcon size={24} />
        </button>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <TodoListFilterForm
          className="flex flex-col gap-8"
          defaultValues={defaultValues}
          onSubmit={data => {
            queryStore.setBucket(data.bucket)
            queryStore.setEnergyLevel(data.availableEnergyLevel)
            queryStore.setExcludeQuery(data.excludeQuery || null)
            queryStore.setQuery(data.q || null)
            queryStore.setSortBy(data.sortBy)
            queryStore.setSortOrder(data.sortOrder)
            queryStore.setPomodoros(
              data.isPomodoroFilteringEnabled ? data.availablePomodoros : null,
            )

            navigate({ to: "/apps/todos" })
          }}
        />
      </div>
    </div>
  )
}

const map = {
  queryStore: {
    to: {
      todoListFilterFormData: (
        input: TodoQueryState,
      ): TodoListFilterFormData => ({
        availableEnergyLevel: input.availableEnergyLevel,
        availablePomodoros: input.availablePomodoros ?? 0,
        bucket: input.bucket,
        excludeQuery: input.excludeQuery || "",
        isPomodoroFilteringEnabled: input.availablePomodoros != null,
        q: input.q || "",
        sortBy: input.sortBy,
        sortOrder: input.sortOrder,
      }),
    },
  },
}
