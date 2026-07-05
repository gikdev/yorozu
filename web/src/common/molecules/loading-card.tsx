import { SpinnerIcon } from '@phosphor-icons/react'

export function LoadingCard(p: { title: string }) {
  return (
    <div className='flex flex-col items-center justify-center py-8 flex-1 text-mist-400 gap-2'>
      <SpinnerIcon size={40} className='animate-spin' />
      <p>{p.title}</p>
    </div>
  )
}
