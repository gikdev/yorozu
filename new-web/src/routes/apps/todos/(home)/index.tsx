import { createFileRoute } from "@tanstack/react-router"
import { Header } from "./-header"
import { listTodosOptions, changeTodoMutation } from "#/common/api/client"
import { useMutation, useQuery } from "@tanstack/react-query"
import { RenderQuery } from "#/common/helpers/render-query"
import { ErrorCard } from "#/common/helpers/error-card"
import { LoadingTodosList } from "./-loading-todos-list"
import { EmtpyTodosList } from "./-empty-todos-list"
import { TodoList } from "#/features/todos/todo-list"
import { CreateNewTodoFab } from "./-create-new-todo-fab"
import { useState } from "react"
import {
  TitledOptionsBottomSheet,
  type TitledOptionsBottomSheetProps,
} from "#/common/organisms/titled-options-bottom-sheet"
import {
  EyeIcon,
  PencilSimpleIcon,
  TrashIcon
} from "@phosphor-icons/react"

export const Route = createFileRoute("/apps/todos/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  const listTodosQ = useQuery(listTodosOptions())
  const changeTodoM = useMutation(changeTodoMutation())

  const [loadingCheckboxTodoId, setLoadingCheckboxTodoId] = useState<string | null>(null)

  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null)
  const isTodoOptionsSheetOpen = selectedTodoId != null
  const closeTodoOptionsSheet = () => setSelectedTodoId(null)
  const openTodoOptionsSheet = (todoId: string) => setSelectedTodoId(todoId)

  const checkOrUncheckTodo = (todoId: string, isCurrentlyDone: boolean) => {
    setLoadingCheckboxTodoId(todoId)

    changeTodoM.mutate({
      path: { id: todoId },
      body: { isDone: !isCurrentlyDone },
    }, {
      onError: error => alert(error.message),
      onSuccess: () => listTodosQ.refetch(),
      onSettled: () => setLoadingCheckboxTodoId(null),
    })
  }
  const viewTodoDetails = (todoId: string) => {
    alert("Not Implemented Yet!")
    console.warn("Not Implemented Yet!", { todoId })
  }
  const editTodo = (todoId: string) => {
    alert("Not Implemented Yet!")
    console.warn("Not Implemented Yet!", { todoId })
  }
  const removeTodo = (todoId: string) => {
    alert("Not Implemented Yet!")
    console.warn("Not Implemented Yet!", { todoId })
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
      onClick: () => removeTodo(selectedTodoId!),
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
          loadingView={<LoadingTodosList />}
          emptyView={<EmtpyTodosList />}
          fullView={
            <TodoList
              todos={listTodosQ.data?.items!}
              onCheckboxClick={checkOrUncheckTodo}
              onMoreOptionsClick={openTodoOptionsSheet}
              onTitleClick={viewTodoDetails}
              loadingCheckboxTodoId={loadingCheckboxTodoId}
            />
          }
          errorView={
            <ErrorCard
              message={listTodosQ.error?.message}
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
