import { en } from "#/common/i18n/en"
import { SpinnerIcon } from "@phosphor-icons/react"

export function LoadingTodosList() {
  return (
    <div className="flex flex-col items-center justify-center py-8 flex-1 text-mist-400 gap-2">
      <SpinnerIcon size={40} className="animate-spin" />
      <p>{en.todos.loadingTodos}</p>
    </div>
  )
}
