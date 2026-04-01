import { getTodoOptions, type TodoResponse } from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { ErrorCard } from "#/common/helpers/error-card"
import { RenderQuery } from "#/common/helpers/render-query"
import { TodoForm, type TodoFormData } from "#/features/todos/todo-form"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/$todoId/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  const { todoId } = Route.useParams()

  const getTodoQ = useQuery(getTodoOptions({ path: { id: todoId } }))

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className="flex items-center gap-2 border-b-2 border-mist-800 p-2">
        <Link to="/apps/todos" className={btn({ isIcon: true })}>
          <ArrowLeftIcon size={24} />
        </Link>

        <p className="">Edit Todo</p>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <RenderQuery
          isList={false}
          status={getTodoQ.status}
          loadingView={<p>Loading...</p>}
          successView={
            <TodoForm
              mode="EDIT"
              className=""
              onSubmit={() => {}}
              defaultValues={Mapper.mapTodoResponseToTodoFormData(
                getTodoQ.data!,
              )}
            />
          }
          errorView={
            <ErrorCard
              message={getTodoQ.error?.message}
              onRetry={getTodoQ.refetch}
            />
          }
        />
      </div>
    </div>
  )
}

class Mapper {
  static mapTodoResponseToTodoFormData(input: TodoResponse): TodoFormData {
    return {
      bucket: input.bucket,
      contexts: input.contexts,
      description: input.description || "",
      dueDate: input.dueDate,
      effortType: input.effortType,
      energyLevel: input.energyLevel,
      isDone: input.isDone,
      isUrgent: input.isUrgent,
      pomodoroEstimate: input.estimatedPomodoros || 0,
      priority: input.priority,
      title: input.title,
      waitingForInfo: input.waitingForInfo,
      why: input.why || "",
    }
  }
}
