import { GearIcon } from '@phosphor-icons/react'
import { createFileRoute } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import { AppShell } from '#/common/molecules/AppShell'
import { AppBar } from '#/common/molecules/page-header'
import { useSecretModeStore } from '#/features/secret-mode/useSecretModeStore'

export const Route = createFileRoute('/apps/hondana/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isUnlocked, lock, unlock } = useSecretModeStore()

  const tryToUnlock = () => {
    const input = window.prompt('Enter pin')
    if (!input) return

    const parsed = Number.parseInt(input, 10)
    if (Number.isNaN(parsed)) return

    const enteredPin = parsed
    const correctPin = 1385
    const isCorrect = enteredPin === correctPin

    if (!isCorrect) {
      toast.error('Wrong!')
      return
    }

    unlock()
    toast.success('🔓')
  }

  const tryToLock = () => {
    lock()
    toast.success('🔒')
  }

  const handleSecretModeEntrance = () => {
    if (isUnlocked) tryToLock()
    else tryToUnlock()
  }

  return (
    <AppShell>
      <title>Settings - 本棚</title>

      <AppBar title='Settings' />

      <main className='flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0'>
        <div className='flex-1 flex flex-col items-center justify-center py-16 text-mist-400'>
          <button
            className='mb-4'
            type='button'
            onDoubleClick={handleSecretModeEntrance}
          >
            <GearIcon size={48} className='' />
          </button>

          <p className='font-bold'>Empty! 🤷🏻‍♂️</p>

          <p className='text-sm mt-1'>
            Nothing here for now... visit here later.
          </p>
        </div>
      </main>
    </AppShell>
  )
}
