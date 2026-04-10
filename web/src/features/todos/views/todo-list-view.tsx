import { RenderQuery } from "#/common/helpers/render-query"
import { ErrorCard } from "#/common/helpers/error-card"
import { TodoList } from "#/features/todos/organisms/todo-list"
import { extractErrorMessage } from "#/common/helpers/errors"
import { LoadingCard } from "#/common/molecules/loading-card"
import { useChangeTodoCompletion } from "#/features/todos/hooks/use-change-todo-completion"
import { useListTodosQuery } from "#/features/todos/hooks/use-list-todos-query"
import { ClipboardTextIcon } from "@phosphor-icons/react"

export interface TodoListViewProps {
  onTitleClick: (todoId: string) => void
  selectedTodoId: string | null
}

export function TodoListView(p: TodoListViewProps) {
  const listTodosQ = useListTodosQuery()
  const [loadingCheckboxTodoId, toggleTodo] = useChangeTodoCompletion()

  return (
    <RenderQuery
      isList={true}
      status={listTodosQ.status}
      listCount={listTodosQ.data?.items.length!}
      loadingView={<LoadingCard title="Loading your todos…" />}
      emptyView={<EmtpyTodosList />}
      fullView={() => (
        <TodoList
          todos={listTodosQ.data?.items!}
          onCheckboxClick={todoId => toggleTodo(todoId, listTodosQ.refetch)}
          onTitleClick={p.onTitleClick}
          loadingCheckboxTodoId={loadingCheckboxTodoId}
          selectedTodoId={p.selectedTodoId}
        />
      )}
      errorView={
        <ErrorCard
          message={extractErrorMessage(listTodosQ.error)}
          onRetry={listTodosQ.refetch}
        />
      }
    />
  )
}

function EmtpyTodosList() {
  return (
    <div className="flex flex-col items-center justify-center py-8 flex-1 text-mist-400 gap-2">
      <ClipboardTextIcon size={40} />
      <p>No todos yet — add one.</p>
    </div>
  )
}
