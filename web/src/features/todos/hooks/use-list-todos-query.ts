import { listTodosOptions } from "#/common/api/client"
import { useQuery } from "@tanstack/react-query"
import { useTodoQueryStore } from "#/features/todos/hooks/use-todo-query-store"

export function useListTodosQuery() {
  const queryStore = useTodoQueryStore()
  const listTodosQ = useQuery(
    listTodosOptions({
      query: {
        available_energy_level: queryStore.availableEnergyLevel,
        available_pomodoros: queryStore.availablePomodoros ?? undefined,
        bucket: queryStore.bucket,
        q: queryStore.q || undefined,
        exclude_query: queryStore.excludeQuery || undefined,
        sort_by: queryStore.sortBy,
        sort_order: queryStore.sortOrder,
      },
    }),
  )

  return listTodosQ
}
