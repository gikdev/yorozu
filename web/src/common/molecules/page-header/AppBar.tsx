import { ArrowLeftIcon, ArrowUpIcon, type Icon } from '@phosphor-icons/react'
import { Link, type LinkOptions, useRouter } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { btn } from '#/common/atoms/btn'

interface AppBarProps {
  left?: ReactNode
  showBack?: boolean
  parentPath?: LinkOptions
  parentIcon?: Icon
  title?: ReactNode
  children?: ReactNode
}

export function AppBar(p: AppBarProps) {
  const showBack = p.showBack ?? true
  const ParentIcon = p.parentIcon ?? ArrowUpIcon
  const router = useRouter()
  const canGoBack = router.history.length > 1

  return (
    <header className='bg-mist-950 border-b border-mist-900 min-h-12 flex items-center'>
      <div className='flex items-center'>
        {p.left}

        {canGoBack && showBack && (
          <button
            type='button'
            aria-label='Go back'
            onClick={() => router.history.back()}
            className={btn({ isIcon: true, className: 'rounded-none' })}
          >
            <ArrowLeftIcon size={24} />
          </button>
        )}

        {p.parentPath && (
          <Link
            aria-label='Go to parent'
            {...p.parentPath}
            className={btn({ isIcon: true, className: 'rounded-none' })}
          >
            <ParentIcon size={24} />
          </Link>
        )}
      </div>

      <div className='text-mist-100 px-2 font-bold text-xl text-start truncate'>
        {p.title}
      </div>

      <div className='flex flex-1 justify-end'>{p.children}</div>
    </header>
  )
}
