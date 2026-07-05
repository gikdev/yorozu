import { PlusIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { tv } from 'tailwind-variants'

export const styleFab = tv({
  base: `
    absolute z-40
    w-14 h-14 rounded-full
    bg-sky-500 text-white
    shadow-lg flex items-center
    justify-center hover:scale-105
    cursor-pointer
    active:scale-95 transition-transform
  `,
})

type FabProps = {
  title?: string
  className?: string
  right: number
  bottom: number
} & (
  | {
      type: 'link'
      to: string
    }
  | {
      type: 'button'
      onClick: () => void
    }
)

export function Fab(p: FabProps) {
  if (p.type === 'link')
    return (
      <Link
        to={p.to}
        title={p.title}
        style={{ right: p.right, bottom: p.bottom }}
        className={p.className ?? styleFab()}
      >
        <PlusIcon size={24} weight='bold' />
      </Link>
    )

  if (p.type === 'button')
    return (
      <button
        onClick={p.onClick}
        type='button'
        title={p.title}
        style={{ right: p.right, bottom: p.bottom }}
        className={p.className ?? styleFab()}
      >
        <PlusIcon size={24} weight='bold' />
      </button>
    )

  return null
}
