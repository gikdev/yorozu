import type { Icon } from '@phosphor-icons/react'

type AppType = 'IDEA' | 'APP' | 'MVP' | 'TOOL'

export type IAppShortcut = {
  id: string
  icon: Icon
  url: string
  name: string
  description: string
  type: AppType
}
