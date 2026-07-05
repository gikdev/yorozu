import type { ReactNode } from 'react'

interface BottomSheetProps {
  onClose: () => void
  children: ReactNode
}

export function BottomSheet(p: BottomSheetProps) {
  return (
    <div className='fixed inset-0 w-dvw h-dvh z-10'>
      <button
        type='button'
        className='fixed z-20 inset-0 w-dvw h-dvh bg-black/50'
        onClick={p.onClose}
      />

      <div className='fixed z-30 bottom-0 left-0 right-0 max-h-[80dvh] overflow-y-auto bg-mist-900 flex flex-col'>
        {p.children}
      </div>
    </div>
  )
}
