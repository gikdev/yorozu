import {
  TodoListFilterForm,
  type TodoListFilterFormData,
} from "#/features/todos/organisms/todo-list-filter-form"
import { useTodoQueryStore } from "#/features/todos/hooks/use-todo-query-store"
import { todosMapper } from "#/features/todos/todos-mapper"

export interface TodoListFilterViewProps {
  onSubmit: () => void
}

export function TodoListFilterView(p: TodoListFilterViewProps) {
  const queryStore = useTodoQueryStore()

  const defaultValues: TodoListFilterFormData =
    todosMapper.mapTodoQueryStore.toTodoListFilterFormData(queryStore)

  return (
    <TodoListFilterForm
      className="flex flex-col gap-8"
      defaultValues={defaultValues}
      onReset={queryStore.reset}
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

        p.onSubmit()
      }}
    />
  )
}
