import { ArrowUpIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'

interface PageHeaderBackButtonProps {
  to: string
}

export function PageHeaderBackButton(p: PageHeaderBackButtonProps) {
  return (
    <Link
      to={p.to}
      aria-label='Go back'
      title='Go back'
      className='min-h-12 aspect-square flex items-center justify-center transition-colors rounded-full hover:bg-mist-800 hover:text-mist-100'
    >
      <ArrowUpIcon size={24} weight='bold' />
    </Link>
  )
}
