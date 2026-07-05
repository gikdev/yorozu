import { TextTabItem } from './TextTabItem'
import type { TextTabItemShape } from './TextTabItemShape'

interface TextTabsProps {
  items: TextTabItemShape[]
  activeTabId: string | null
  onTabChange: (id: string | null) => void
}

export const TextTabs = (p: TextTabsProps) => (
  <div className='flex'>
    {p.items.map(item => (
      <TextTabItem
        key={item.id}
        id={item.id}
        label={item.label}
        isActive={item.id === p.activeTabId}
        onClick={() => p.onTabChange(item.id)}
      />
    ))}
  </div>
)
