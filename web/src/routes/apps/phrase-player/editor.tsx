import { createFileRoute, linkOptions } from '@tanstack/react-router'
import { AppBar } from '#/common/molecules/page-header'

const TITLE = 'Phrase Player - Editor'

export const Route = createFileRoute('/apps/phrase-player/editor')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full'>
      <AppBar title={TITLE} parentPath={linkOptions({ to: '/apps/phrase-player' })} />

      <main className='flex-1 flex flex-col gap-6 p-4 overflow-y-auto min-h-0'>
        <p>WIP.</p>
      </main>
    </div>
  )
}
