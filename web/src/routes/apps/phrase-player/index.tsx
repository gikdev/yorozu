import { createFileRoute, Link, linkOptions } from '@tanstack/react-router'
import { btn } from '#/common/atoms/btn'
import { AppBar } from '#/common/molecules/page-header'
import { MusicNotesPlusIcon, PlayCircleIcon } from '@phosphor-icons/react'

const TITLE = 'Phrase Player'

export const Route = createFileRoute('/apps/phrase-player/')({
  component: RouteComponent,
})

function RouteComponent() {
  const LINK_CLN = "flex-1 flex flex-col rounded-none"

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400'>
      <AppBar title={TITLE} parentPath={linkOptions({ to: '/apps' })} />

      <main className='flex-1 flex'>
        <Link to='/apps/phrase-player/player' className={btn({ class: LINK_CLN })}>
          <PlayCircleIcon size={48} weight='duotone' />
          <p className='text-2xl font-bold text-mist-100'>Player</p>
          <p>Play an existing configured song.</p>
        </Link>

        <Link to='/apps/phrase-player/editor' className={btn({ class: LINK_CLN })}>
          <MusicNotesPlusIcon size={48} weight='duotone' />
          <p className='text-2xl font-bold text-mist-100'>Editor</p>
          <p>Configure a song (new / edit).</p>
        </Link>
      </main>
    </div>
  )
}
