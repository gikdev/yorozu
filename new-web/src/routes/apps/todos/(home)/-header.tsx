import { btn } from "#/common/atoms/btn"
import { en } from "#/common/i18n/en"
import { FunnelIcon, HouseIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

export function Header({}: {}) {
  return (
    <header className="flex items-center justify-between gap-2 border-b-2 border-mist-800 p-2">
      <Link to="/" className={btn({ isIcon: true })}>
        <HouseIcon size={24} />
      </Link>

      <p className="text-sky-500 font-bold text-lg">{en.todos.appTitle}</p>

      <button disabled className={btn({ isIcon: true })}>
        <FunnelIcon size={24} />
      </button>
    </header>
  )
}
