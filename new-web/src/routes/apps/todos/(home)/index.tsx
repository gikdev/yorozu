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
import { useState } from "react"

export const Route = createFileRoute("/apps/todos/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null)
  const listTodosQ = useQuery(listTodosOptions())

  const handleCheckboxClick = (todoId: string) => {
    console.log(`Todo ID: ${todoId} - checkbox clicked!`)
  }

  const handleTitleClick = (todoId: string) => {
    console.log(`Todo ID: ${todoId} - title clicked!`)
  }

  const handleMoreOptionsClick = (todoId: string) => {
    console.log(`Todo ID: ${todoId} - more options clicked!`)
  }

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
              onCheckboxClick={handleCheckboxClick}
              onMoreOptionsClick={handleMoreOptionsClick}
              onTitleClick={handleTitleClick}
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
    </div>
  )
}
