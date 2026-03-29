import { createTodoMutation } from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { en } from "#/common/i18n/en"
import { TodoForm } from "#/features/todos/todo-form"
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
            createTodoM.mutate(
              {
                body: {
                  title: data.title,
                  bucket: data.bucket,
                  contexts: data.contexts.map(c => c.trim()).filter(c => !!c),
                  description: data.description || null,
                  dueDate: data.dueDate,
                  effortType: data.effortType,
                  energyLevel: data.energyLevel,
                  isDone: data.isDone,
                  isUrgent: data.isUrgent,
                  pomodoroEstimate: data.pomodoroEstimate,
                  priority: data.priority,
                  waitingForInfo: data.waitingForInfo
                    ? {
                        description: {
                          value: data.waitingForInfo.description,
                        },
                        reviewAt: {
                          value: data.waitingForInfo.reviewAt,
                        },
                      }
                    : null,
                  why: data.why || null,
                },
              },
              {
                onSuccess: () => {
                  onFinish()
                },
                onError(error) {
                  alert(error.message)
                },
              },
            )
          }}
        />
      </div>
    </div>
  )
}
