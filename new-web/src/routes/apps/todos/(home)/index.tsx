import { createFileRoute } from "@tanstack/react-router"
import { Header } from "./-header"
import { listTodosOptions } from "#/common/api/client"
import { useQuery } from "@tanstack/react-query"
import { RenderQuery } from "#/common/helpers/render-query"
import { ErrorCard } from "#/common/helpers/error-card"
import { LoadingTodosList } from "./-loading-todos-list"
import { EmtpyTodosList } from "./-empty-todos-list"
import { TodoList } from "#/features/todos/todo-list"
import { CreateNewTodoFab } from "./-create-new-todo-fab"

export const Route = createFileRoute("/apps/todos/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  const listTodosQ = useQuery(listTodosOptions())

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
          fullView={<TodoList todos={listTodosQ.data?.items!} />}
          errorView={
            <ErrorCard
              message={listTodosQ.error?.message}
              onRetry={listTodosQ.refetch}
            />
          }
        />

        <CreateNewTodoFab />
      </div>
    </div>
  )
}
