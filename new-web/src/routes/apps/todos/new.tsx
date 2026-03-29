import { TodoForm } from "#/features/todos/todo-form"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/apps/todos/new")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <TodoForm
        mode="CREATE"
        className="flex flex-col gap-4"
        onSubmit={() => {}}
      />
    </div>
  )
}
