import { changeTodoMutation, getTodoOptions } from "#/common/api/client"
import { ErrorCard } from "#/common/helpers/error-card"
import { extractErrorMessage } from "#/common/helpers/errors"
import { RenderQuery } from "#/common/helpers/render-query"
import { LoadingCard } from "#/common/molecules/loading-card"
import { todosMapper } from "#/features/todos/todos-mapper"
import {
  TodoForm,
  type TodoFormData,
} from "#/features/todos/organisms/todo-form"
import { useMutation, useQuery } from "@tanstack/react-query"

export interface EditTodoViewProps {
  todoId: string
  onFinish: () => void
}

export function EditTodoView(p: EditTodoViewProps) {
  const path = { id: p.todoId }
  const getTodoQ = useQuery(getTodoOptions({ path }))
  const changeTodoM = useMutation(changeTodoMutation())

  const handleFormSubmit = (data: TodoFormData, onFinish: () => void) => {
    const body = todosMapper.mapTodoFormData.toChangeTodoData(data)

    changeTodoM.mutate(
      { body, path },
      {
        onError: error => alert(extractErrorMessage(error)),
        onSuccess: () => {
          onFinish()
          p.onFinish()
        },
      },
    )
  }

  return (
    <RenderQuery
      isList={false}
      status={getTodoQ.status}
      loadingView={<LoadingCard title="Loading form…" />}
      successView={() => (
        <TodoForm
          mode="EDIT"
          className="flex flex-col gap-8"
          onSubmit={handleFormSubmit}
          defaultValues={todosMapper.mapTodoResponse.toTodoFormData(
            getTodoQ.data!,
          )}
        />
      )}
      errorView={
        <ErrorCard
          message={extractErrorMessage(getTodoQ.error)}
          onRetry={getTodoQ.refetch}
        />
      }
    />
  )
}
