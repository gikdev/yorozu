import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Header } from "./-header"
import { RenderQuery } from "#/common/helpers/render-query"
import { ErrorCard } from "#/common/helpers/error-card"
import { EmtpyTodosList } from "./-empty-todos-list"
import { TodoList } from "#/features/todos/organisms/todo-list"
import { CreateNewTodoFab } from "./-create-new-todo-fab"
import { extractErrorMessage } from "#/common/helpers/errors"
import { LoadingCard } from "#/common/molecules/loading-card"
import { useChangeTodoCompletion } from "#/features/todos/hooks/use-change-todo-completion"
import { useListTodosQuery } from "#/features/todos/hooks/use-list-todos-query"

export const Route = createFileRoute("/apps/todos/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const listTodosQ = useListTodosQuery()
  const [loadingCheckboxTodoId, toggleTodo] = useChangeTodoCompletion()

  const viewTodoDetails = (todoId: string) => {
    navigate({
      to: "/apps/todos/$todoId",
      params: { todoId },
    })
  }

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
              onCheckboxClick={todoId => toggleTodo(todoId, listTodosQ.refetch)}
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
    </div>
  )
}
