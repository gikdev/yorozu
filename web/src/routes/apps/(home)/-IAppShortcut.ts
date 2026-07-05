import type { Icon } from '@phosphor-icons/react'

type IAppShortcutTypeIdea = {
  type: 'IDEA'
  description: string
}

type IAppShortcutTypeMvp = {
  type: 'MVP'
  url: string
}

type IAppShortcutTypeApp = {
  type: 'APP'
  url: string
}

type IAppShortcutTypes =
  | IAppShortcutTypeApp
  | IAppShortcutTypeIdea
  | IAppShortcutTypeMvp

type IAppShortcutBase = {
  id: string
  icon: Icon
  name: string
}

export type IAppShortcut = IAppShortcutBase & IAppShortcutTypes
