import { PhCheckFat, PhCheckCircle } from '@phosphor-icons/vue'
import type { AppShortcut } from './app-shortcut'

export const appShortcuts: AppShortcut[] = [
  {
    id: 'old-todos',
    name: 'Old Todos',
    Icon: PhCheckCircle,
    url: '/todo',
  },
  {
    id: 'todos',
    name: 'Todos',
    Icon: PhCheckFat,
    url: '/apps/todos',
  },
]
