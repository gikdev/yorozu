import { getTodoOptions } from "#/common/api/client"
import { ErrorCard } from "#/common/helpers/error-card"
import { extractErrorMessage } from "#/common/helpers/errors"
import { RenderQuery } from "#/common/helpers/render-query"
import { LoadingCard } from "#/common/molecules/loading-card"
import { TodoDetails } from "#/features/todos/organisms/todo-details"
import { useQuery } from "@tanstack/react-query"

export interface TodoDetailsViewProps {
  todoId: string
  onEdit: (() => void) | null
  isEditBtnLoading: boolean
  onDelete: (() => void) | null
  isDeleteBtnLoading: boolean
}

export function TodoDetailsView(p: TodoDetailsViewProps) {
  const getTodoQ = useQuery(getTodoOptions({ path: { id: p.todoId } }))

  return (
    <RenderQuery
      isList={false}
      status={getTodoQ.status}
      loadingView={<LoadingCard title="Loading details…" />}
      successView={() => (
        <TodoDetails
          onDelete={p.onDelete}
          isDeleteBtnLoading={p.isDeleteBtnLoading}
          onEdit={p.onEdit}
          isEditBtnLoading={p.isEditBtnLoading}
          todo={getTodoQ.data!}
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
