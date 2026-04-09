import {
  changeTodoMutation,
  getTodoOptions,
  type ChangeTodoRequest,
  type TodoResponse,
} from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { ErrorCard } from "#/common/helpers/error-card"
import { extractErrorMessage } from "#/common/helpers/errors"
import { RenderQuery } from "#/common/helpers/render-query"
import { LoadingCard } from "#/common/molecules/loading-card"
import { TodoForm, type TodoFormData } from "#/features/todos/views/todo-form"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/$todoId/edit")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { todoId } = Route.useParams()

  const getTodoQ = useQuery(getTodoOptions({ path: { id: todoId } }))
  const changeTodoM = useMutation(changeTodoMutation())

  const handleFormSubmit = (data: TodoFormData, onFinish: () => void) => {
    const body = map.todoFormData.to.changeTodoData(data)

    changeTodoM.mutate(
      {
        body,
        path: { id: todoId },
      },
      {
        onError: error => alert(extractErrorMessage(error)),
        onSuccess: () => {
          onFinish()
          navigate({ to: "/apps/todos/$todoId", params: { todoId } })
        },
      },
    )
  }

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
          loadingView={<LoadingCard title="Loading form…" />}
          successView={() => (
            <TodoForm
              mode="EDIT"
              className="flex flex-col gap-8"
              onSubmit={handleFormSubmit}
              defaultValues={map.todoResponse.to.todoFormData(getTodoQ.data!)}
            />
          )}
          errorView={
            <ErrorCard
              message={extractErrorMessage(getTodoQ.error)}
              onRetry={getTodoQ.refetch}
            />
          }
        />
      </div>
    </div>
  )
}

const map = {
  todoResponse: {
    to: {
      todoFormData(input: TodoResponse): TodoFormData {
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
      },
    },
  },
  todoFormData: {
    to: {
      changeTodoData(i: TodoFormData): ChangeTodoRequest {
        return {
          bucket: i.bucket,
          contexts: i.contexts,
          description: i.description || null,
          dueDate: i.dueDate,
          effortType: i.effortType,
          energyLevel: i.energyLevel,
          estimatedPomodoros: i.pomodoroEstimate,
          isDone: i.isDone,
          isUrgent: i.isUrgent,
          priority: i.priority,
          title: i.title,
          waitingForInfo: i.waitingForInfo != null ? i.waitingForInfo : null,
          why: i.why || null,
        }
      },
    },
  },
}
