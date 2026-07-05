import { Link } from '@tanstack/react-router'
import type { BottomNavItemShape } from './BottomNavItemShape'
import { styleBottomNavItem } from './styleBottomNavItem'

interface BottomNavItemProps extends BottomNavItemShape {
  isActive?: boolean
}

export function BottomNavItem(p: BottomNavItemProps) {
  const ACTIVE_ITEM_LABEL = '●'
  const styles = styleBottomNavItem({
    active: p.isActive,
    disabled: p.disabled,
  })

  const content = (
    <>
      <p.icon size={24} weight={p.isActive ? 'fill' : 'regular'} />
      <span>{p.isActive ? ACTIVE_ITEM_LABEL : p.label}</span>
    </>
  )

  if (p.disabled) {
    return (
      <button disabled className={styles} type='button'>
        {content}
      </button>
    )
  }

  return (
    <Link to={p.to} className={styles}>
      {content}
    </Link>
  )
}
