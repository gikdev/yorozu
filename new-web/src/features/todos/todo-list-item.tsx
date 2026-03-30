import { btn } from "#/common/atoms/btn"
import {
  CheckSquareIcon,
  SquareIcon,
  DotsThreeIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react"

type TodoListItemProps = {
  title: string
  isDone: boolean
  isCheckboxLoading: boolean
  isTitleLoading: boolean
  onCheckboxClick: () => void
  onTitleClick: () => void
  onMoreOptionsClick: () => void
}

export function TodoListItem(p: TodoListItemProps) {
  return (
    <div className="flex items-center gap-0">
      <button
        className={btn({ isIcon: true })}
        disabled
        onClick={p.onCheckboxClick}
      >
        {p.isCheckboxLoading && (
          <CircleNotchIcon size={24} className="animate-spin" />
        )}
        {!p.isCheckboxLoading && p.isDone && (
          <CheckSquareIcon weight="fill" size={24} />
        )}
        {!p.isCheckboxLoading && !p.isDone && <SquareIcon size={24} />}
      </button>

      <button
        className={btn({ className: "flex-1 justify-start text-start" })}
        disabled
        onClick={p.onTitleClick}
      >
        {p.isTitleLoading ? (
          <span className="block h-4 w-20 bg-mist-500 animate-pulse" />
        ) : (
          <span>{p.title}</span>
        )}
      </button>

      <button
        className={btn({ isIcon: true })}
        disabled
        onClick={p.onMoreOptionsClick}
      >
        <DotsThreeIcon size={24} />
      </button>
    </div>
  )
}
