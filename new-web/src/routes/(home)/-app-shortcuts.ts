import { CheckFatIcon } from "@phosphor-icons/react"
import type { IAppShortcut } from "./-i-app-shortcut"
import { linkOptions } from "@tanstack/react-router"

export const appShortcuts: IAppShortcut[] = [
  {
    id: "todos",
    name: "Todos",
    Icon: CheckFatIcon,
    url: linkOptions({ to: "/apps/todos" }).to,
  },
]
