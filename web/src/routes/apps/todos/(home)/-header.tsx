import { btn } from "#/common/atoms/btn"
import { en } from "#/common/i18n/en"
import { useTodoQueryStore } from "#/features/todos/use-todo-query-store"
import { FunnelIcon, HouseIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

export function Header({}: {}) {
  const hasFilter = useTodoQueryStore(s => s.hasFilter())

  return (
    <header className="flex items-center justify-between gap-2 border-b-2 border-mist-800 p-2">
      <Link to="/" className={btn({ isIcon: true })}>
        <HouseIcon size={24} />
      </Link>

      <p className="text-sky-500 font-bold text-lg">{en.todos.appTitle}</p>

      <Link
        to="/apps/todos/filter"
        className={btn({ isIcon: true, className: "relative" })}
      >
        <FunnelIcon size={24} />
        {hasFilter && (
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-sky-500" />
        )}
      </Link>
    </header>
  )
}
