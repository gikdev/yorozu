import { Link } from '@tanstack/react-router'
import type { IAppShortcut } from './-i-app-shortcut'

export const AppShortcut = ({ shortcut }: { shortcut: IAppShortcut }) => (
  <Link to={shortcut.url} className="transition-all flex flex-col items-center gap-2 p-4 hover:shadow-md active:shadow-inner dark:active:shadow-none dark:active:scale-95 dark:hover:bg-mist-800 rounded-md">
    <div className="bg-yellow-300 dark:bg-yellow-600 p-2 aspect-square max-w-max rounded-md">
      <shortcut.Icon weight="fill" size="32" />
    </div>

    <p>{shortcut.name}</p>
  </Link>
)
