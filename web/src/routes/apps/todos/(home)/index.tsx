import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Header } from "./-header"
import {
  listTodosOptions,
  changeTodoCompletionMutation,
  TodoCompletionChangeAction,
} from "#/common/api/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { RenderQuery } from "#/common/helpers/render-query"
import { ErrorCard } from "#/common/helpers/error-card"
import { EmtpyTodosList } from "./-empty-todos-list"
import { TodoList } from "#/features/todos/todo-list"
import { CreateNewTodoFab } from "./-create-new-todo-fab"
import { useState } from "react"
import {
  TitledOptionsBottomSheet,
  type TitledOptionsBottomSheetProps,
} from "#/common/organisms/titled-options-bottom-sheet"
import { EyeIcon, PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react"
import { useDeleteTodo } from "#/features/todos/use-delete-todo"
import { extractErrorMessage } from "#/common/helpers/errors"
import { LoadingCard } from "#/common/molecules/loading-card"
import { useTodoQueryStore } from "#/features/todos/use-todo-query-store"

export const Route = createFileRoute("/apps/todos/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
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

  const changeTodoCompletionM = useMutation(changeTodoCompletionMutation())
  const [loadingCheckboxTodoId, setLoadingCheckboxTodoId] = useState<
    string | null
  >(null)

  const [deleteTodo] = useDeleteTodo({
    onError: error => alert(extractErrorMessage(error)),
    onSuccess: () => {
      setSelectedTodoId(null)
      listTodosQ.refetch()
    },
  })

  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null)
  const isTodoOptionsSheetOpen = selectedTodoId != null
  const closeTodoOptionsSheet = () => setSelectedTodoId(null)
  const openTodoOptionsSheet = (todoId: string) => setSelectedTodoId(todoId)

  const checkOrUncheckTodo = (todoId: string, isCurrentlyDone: boolean) => {
    setLoadingCheckboxTodoId(todoId)

    changeTodoCompletionM.mutate(
      {
        path: { id: todoId },
        body: {
          completionChangeAction: isCurrentlyDone
            ? TodoCompletionChangeAction.MARK_NOT_DONE
            : TodoCompletionChangeAction.MARK_DONE,
        },
      },
      {
        onError: error => alert(extractErrorMessage(error)),
        onSuccess: () => listTodosQ.refetch(),
        onSettled: () => setLoadingCheckboxTodoId(null),
      },
    )
  }
  const viewTodoDetails = (todoId: string) => {
    navigate({
      to: "/apps/todos/$todoId",
      params: { todoId },
    })
  }
  const editTodo = (todoId: string) => {
    navigate({
      to: "/apps/todos/$todoId/edit",
      params: { todoId },
    })
  }

  const optionItems: TitledOptionsBottomSheetProps["optionItems"] = [
    {
      title: "View Todo",
      Icon: EyeIcon,
      onClick: () => viewTodoDetails(selectedTodoId!),
    },
    {
      title: "Edit Todo",
      Icon: PencilSimpleIcon,
      onClick: () => editTodo(selectedTodoId!),
    },
    {
      title: "Delete Todo",
      Icon: TrashIcon,
      onClick: () => deleteTodo(selectedTodoId!),
    },
  ]

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col p-2">
        <RenderQuery
          isList={true}
          status={listTodosQ.status}
          listCount={listTodosQ.data?.items.length!}
          loadingView={<LoadingCard title="Loading your todos…" />}
          emptyView={<EmtpyTodosList />}
          fullView={() => (
            <TodoList
              todos={listTodosQ.data?.items!}
              onCheckboxClick={checkOrUncheckTodo}
              onMoreOptionsClick={openTodoOptionsSheet}
              onTitleClick={viewTodoDetails}
              loadingCheckboxTodoId={loadingCheckboxTodoId}
            />
          )}
          errorView={
            <ErrorCard
              message={extractErrorMessage(listTodosQ.error)}
              onRetry={listTodosQ.refetch}
            />
          }
        />

        <CreateNewTodoFab />
      </div>

      {isTodoOptionsSheetOpen && (
        <TitledOptionsBottomSheet
          title="More Options"
          onClose={closeTodoOptionsSheet}
          optionItems={optionItems}
        />
      )}
    </div>
  )
}
