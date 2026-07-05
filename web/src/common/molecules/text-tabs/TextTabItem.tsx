import { styleTextTabItem } from './styleTextTabItem'
import type { TextTabItemShape } from './TextTabItemShape'

interface TextTabItemProps extends TextTabItemShape {
  isActive: boolean
  onClick: () => void
}

export function TextTabItem(p: TextTabItemProps) {
  const styles = styleTextTabItem({ isActive: p.isActive })

  return (
    <button className={styles} onClick={p.onClick} type='button'>
      {p.label}
    </button>
  )
}
