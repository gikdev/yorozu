import { Link } from '@tanstack/react-router'
import { tv } from 'tailwind-variants'
import type { IAppShortcut } from './-IAppShortcut'

const styleApp = tv({
  base: 'flex flex-col items-center gap-1 p-4 rounded-md text-center min-w-max cursor-pointer min-w-24 w-full max-w-36',
  variants: {
    type: {
      MVP: 'bg-emerald-900/20 hover:bg-emerald-800/30 text-emerald-400 hover:text-emerald-100 hover:ring-1 hover:ring-emerald-600/50',
      APP: 'bg-sky-900/20 hover:bg-sky-800/30 text-sky-400 hover:text-sky-100 hover:ring-1 hover:ring-sky-600/50',
      IDEA: 'bg-yellow-900/20 hover:bg-yellow-800/30 text-yellow-400 hover:text-yellow-100 hover:ring-1 hover:ring-yellow-600/50',
      NONE: 'bg-mist-900/20 hover:bg-mist-800/30 text-mist-400 hover:text-mist-100 hover:ring-1 hover:ring-mist-600/50',
    },
  },
  defaultVariants: {
    type: 'NONE',
  },
})

interface AppShortcutProps {
  shortcut: IAppShortcut
}

export const AppShortcut = ({ shortcut: s }: AppShortcutProps) => {
  const styles = styleApp({ type: s.type })

  const showDescription = () => {
    if (s.type !== 'IDEA') return
    alert(`${s.description}`)
  }

  const content = (
    <>
      <s.icon weight='fill' size='32' />
      <p className='text-xs'>{s.name}</p>
    </>
  )

  if (s.type === 'IDEA')
    return (
      <button onClick={showDescription} className={styles} type='button'>
        {content}
      </button>
    )

  if (s.type === 'MVP' || s.type === 'APP')
    return (
      <Link to={s.url} className={styles}>
        {content}
      </Link>
    )

  return null
}
