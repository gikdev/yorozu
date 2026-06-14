import {
  BooksIcon,
  BoundingBoxIcon,
  CirclesFourIcon,
  CurrencyDollarIcon,
  FileAudioIcon,
  KanbanIcon,
  ListChecksIcon,
  TargetIcon,
  UserSwitchIcon,
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
  {
    id: "hondana",
    name: "本棚",
    Icon: BooksIcon,
    url: linkOptions({ to: "/apps/hondana" }).to,
  },
  {
    id: "lyrics",
    name: "Lyrics",
    Icon: FileAudioIcon,
    url: linkOptions({ to: "/apps/lyrics" }).to,
  },
  {
    id: "chrono-track",
    name: "Chrono Track",
    Icon: BoundingBoxIcon,
    url: linkOptions({ to: "/apps/chrono-track" }).to,
  },
]
