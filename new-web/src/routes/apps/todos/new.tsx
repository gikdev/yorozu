import { createTodoMutation, type CreateTodoRequest } from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { extractErrorMessage } from "#/common/helpers/errors"
import { en } from "#/common/i18n/en"
import { TodoForm, type TodoFormData } from "#/features/todos/todo-form"
import { ArrowLeftIcon } from "@phosphor-icons/react"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const createTodoM = useMutation(createTodoMutation())

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className="flex items-center gap-2 border-b-2 border-mist-800 p-2">
        <Link to="/apps/todos" className={btn({ isIcon: true })}>
          <ArrowLeftIcon size={24} />
        </Link>

        <p className="">{en.todos.createNewTitle}</p>
      </header>

      <div className="flex-1 flex flex-col p-4">
        <TodoForm
          mode="CREATE"
          className="flex flex-col gap-8"
          onSubmit={(data, onFinish) => {
            const body = Mapper.mapTodoFormDataToCreateTodoRequest(data)

            createTodoM.mutate(
              { body },
              {
                onSuccess: () => onFinish(),
                onError: error => alert(extractErrorMessage(error)),
              },
            )
          }}
        />
      </div>
    </div>
  )
}

class Mapper {
  static mapTodoFormDataToCreateTodoRequest(
    input: TodoFormData,
  ): CreateTodoRequest {
    return {
      title: input.title,
      bucket: input.bucket,
      contexts: input.contexts.map(c => c.trim()).filter(c => !!c),
      description: input.description || null,
      dueDate: input.dueDate,
      effortType: input.effortType,
      energyLevel: input.energyLevel,
      isDone: input.isDone,
      isUrgent: input.isUrgent,
      pomodoroEstimate: input.pomodoroEstimate,
      priority: input.priority,
      why: input.why || null,
      waitingForInfo: input.waitingForInfo
        ? {
            description: input.waitingForInfo.description,
            reviewAt: input.waitingForInfo.reviewAt,
          }
        : null,
    }
  }
}
