import {
  changeTodoCompletionMutation,
  TodoCompletionChangeAction,
} from "#/common/api/client"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { extractErrorMessage } from "#/common/helpers/errors"

export function useChangeTodoCompletion() {
  const changeTodoCompletionM = useMutation(changeTodoCompletionMutation())

  const [loadingCheckboxTodoId, setLoadingCheckboxTodoId] = useState<
    string | null
  >(null)

  const toggleTodo = (todoId: string, onSuccess: () => void) => {
    setLoadingCheckboxTodoId(todoId)

    changeTodoCompletionM.mutate(
      {
        path: { id: todoId },
        body: { completionChangeAction: TodoCompletionChangeAction.TOGGLE },
      },
      {
        onError: error => alert(extractErrorMessage(error)),
        onSettled: () => setLoadingCheckboxTodoId(null),
        onSuccess,
      },
    )
  }

  return [loadingCheckboxTodoId, toggleTodo] as const
}
