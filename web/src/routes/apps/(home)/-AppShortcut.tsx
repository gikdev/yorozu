import { Link } from "@tanstack/react-router"
import type { IAppShortcut } from "./-IAppShortcut"

export const AppShortcut = ({ shortcut }: { shortcut: IAppShortcut }) => (
  <Link
    to={shortcut.url}
    className="transition-all flex flex-col items-center gap-2 p-4 hover:bg-mist-800 rounded-md hover:text-white"
  >
    <div className="bg-mist-800 p-2 aspect-square max-w-max rounded-md">
      <shortcut.Icon weight="fill" size="32" />
    </div>

    <p>{shortcut.name}</p>
  </Link>
)
