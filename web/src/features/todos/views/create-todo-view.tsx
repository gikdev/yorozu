import { createTodoMutation } from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"
import { TodoForm } from "#/features/todos/organisms/todo-form"
import { todosMapper } from "#/features/todos/todos-mapper"
import { useMutation } from "@tanstack/react-query"

export function CreateTodoView() {
  const createTodoM = useMutation(createTodoMutation())

  return (
    <TodoForm
      mode="CREATE"
      className="flex flex-col gap-8"
      onSubmit={(data, onFinish) => {
        const body = todosMapper.mapTodoFormData.toCreateTodoRequest(data)

        createTodoM.mutate(
          { body },
          {
            onSuccess: () => onFinish(),
            onError: error => alert(extractErrorMessage(error)),
          },
        )
      }}
    />
  )
}
