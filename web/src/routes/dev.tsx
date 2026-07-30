import { createFileRoute, linkOptions } from '@tanstack/react-router'
import { useEffect } from 'react'
import { AppBar } from '#/common/molecules/page-header'
import { TimestampSongPlayer } from '#/features/phrase-player/timestamp-song-player'

export const Route = createFileRoute('/dev')({
  component: RouteComponent,
})

function RouteComponent() {
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      // e.returnValue = ''
    }

    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [])

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400'>
      <AppBar
        title="Developer Page"
        parentPath={linkOptions({ to: '/' })}
        showBack={false}
      />

      <main className='flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0'>
        <TimestampSongPlayer />
      </main>
    </div>
  )
}
