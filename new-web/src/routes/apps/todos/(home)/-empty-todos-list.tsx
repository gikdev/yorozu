import { en } from "#/common/i18n/en"
import { ClipboardTextIcon } from "@phosphor-icons/react"

export function EmtpyTodosList() {
  return (
    <div className="flex flex-col items-center justify-center py-8 flex-1 text-mist-400 gap-2">
      <ClipboardTextIcon size={40} />
      <p>{en.todos.emptyTodos}</p>
    </div>
  )
}
