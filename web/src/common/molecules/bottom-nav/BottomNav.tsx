import { BottomNavItem } from "./BottomNavItem"
import type { BottomNavItemShape } from "./BottomNavItemShape"

interface BottomNavProps {
  items: BottomNavItemShape[]
  activeTabId: string | null
}

export const BottomNav = (p: BottomNavProps) => (
  <div className="flex border-t-2 border-mist-900">
    {p.items.map(item => (
      <BottomNavItem
        key={item.to}
        icon={item.icon}
        id={item.id}
        label={item.label}
        to={item.to}
        disabled={item.disabled}
        isActive={item.id === p.activeTabId}
      />
    ))}
  </div>
)
