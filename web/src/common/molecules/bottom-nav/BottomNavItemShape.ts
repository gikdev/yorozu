import type { Icon } from "@phosphor-icons/react"

export interface BottomNavItemShape {
  id: string
  icon: Icon
  label: string
  to: string
  disabled?: boolean
}
