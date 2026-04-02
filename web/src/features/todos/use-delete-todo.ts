import { deleteTodoMutation } from "#/common/api/client"
import { useMutation } from "@tanstack/react-query"
import type { AxiosError } from "axios"

type Props = {
  onSuccess?: () => void
  onError?: (error: AxiosError<Error, any>) => void
}

export function useDeleteTodo({ onError, onSuccess }: Props) {
  const deleteTodoM = useMutation(deleteTodoMutation())

  const removeTodo = (todoId: string) => {
    const isConfirmed = window.confirm("Sure?")
    if (!isConfirmed) return

    deleteTodoM.mutate({ path: { id: todoId } }, { onError, onSuccess })
  }

  return [removeTodo, deleteTodoM] as const
}
