import {
  CirclesFourIcon,
  CurrencyDollarIcon,
  KanbanIcon,
  ListChecksIcon,
  TargetIcon,
} from "@phosphor-icons/react"
import type { IAppShortcut } from "./-IAppShortcut"
import { linkOptions } from "@tanstack/react-router"

export const appShortcuts: IAppShortcut[] = [
  {
    id: "choice",
    name: "Choice",
    Icon: ListChecksIcon,
    url: linkOptions({ to: "/apps/choice" }).to,
  },
  {
    id: "single-focus",
    name: "Single Focus",
    Icon: TargetIcon,
    url: linkOptions({ to: "/apps/single-focus" }).to,
  },
  {
    id: "kanban",
    name: "Kanban",
    Icon: KanbanIcon,
    url: linkOptions({ to: "/apps/kanban" }).to,
  },
  {
    id: "time-orbs",
    name: "Time Orbs",
    Icon: CirclesFourIcon,
    url: linkOptions({ to: "/apps/time-orbs" }).to,
  },
  {
    id: "expenses",
    name: "Expenses",
    Icon: CurrencyDollarIcon,
    url: linkOptions({ to: "/apps/expenses" }).to,
  },
]
