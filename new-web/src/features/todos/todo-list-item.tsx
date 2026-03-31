import { btn } from "#/common/atoms/btn"
import {
  DotsThreeIcon,
  CircleNotchIcon,
  CheckCircleIcon,
  CircleIcon
} from "@phosphor-icons/react"

type TodoListItemProps = {
  todoId: string
  title: string
  isDone: boolean
  isCheckboxLoading: boolean
  isTitleLoading: boolean
  onCheckboxClick: (todoId: string, isCurrentlyDone: boolean) => void
  onTitleClick: (todoId: string) => void
  onMoreOptionsClick: (todoId: string) => void
}

export function TodoListItem(p: TodoListItemProps) {
  return (
    <div data-done={p.isDone} className="flex items-center gap-0 data-[done=true]:opacity-50">
      <button
        className={btn({ isIcon: true })}
        onClick={() => p.onCheckboxClick(p.todoId, p.isDone)}
      >
        {p.isCheckboxLoading && (
          <CircleNotchIcon size={24} className="animate-spin" />
        )}
        {!p.isCheckboxLoading && p.isDone && (
          <CheckCircleIcon weight="fill" size={24} />
        )}
        {!p.isCheckboxLoading && !p.isDone && <CircleIcon size={24} />}
      </button>

      <button
        className={btn({ className: "flex-1 justify-start text-start" })}
        onClick={() => p.onTitleClick(p.todoId)}
      >
        {p.isTitleLoading ? (
          <span className="block h-4 w-20 bg-mist-500 animate-pulse" />
        ) : (
          <span>{p.title}</span>
        )}
      </button>

      <button
        className={btn({ isIcon: true })}
        onClick={() => p.onMoreOptionsClick(p.todoId)}
      >
        <DotsThreeIcon size={24} />
      </button>
    </div>
  )
}
