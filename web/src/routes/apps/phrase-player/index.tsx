import { MusicNotesPlusIcon, PlayCircleIcon } from '@phosphor-icons/react'
import { createFileRoute, Link, linkOptions } from '@tanstack/react-router'
import { btn } from '#/common/atoms/btn'
import { AppBar } from '#/common/molecules/page-header'

const TITLE = 'Phrase Player'

export const Route = createFileRoute('/apps/phrase-player/')({
  component: RouteComponent,
})

function RouteComponent() {
  const LINK_CLN = btn({ class: 'flex-1 flex flex-col rounded-none items-center text-center justify-center' })
  const SECTION_TITLE_CLN = 'text-2xl font-bold text-mist-100'

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400'>
      <AppBar title={TITLE} parentPath={linkOptions({ to: '/apps' })} />

      <main className='flex-1 flex flex-col sm:flex-row'>
        <Link to='/apps/phrase-player/player' className={LINK_CLN}>
          <PlayCircleIcon size={48} weight='duotone' />
          <p className={SECTION_TITLE_CLN}>Player</p>
          <p>Play an existing configured song.</p>
        </Link>

        <Link to='/apps/phrase-player/editor' className={LINK_CLN}>
          <MusicNotesPlusIcon size={48} weight='duotone' />
          <p className={SECTION_TITLE_CLN}>Editor</p>
          <p>Configure a song (new / edit).</p>
        </Link>
      </main>
    </div>
  )
}
