import { PencilSimpleIcon } from '@phosphor-icons/react'
import { createFileRoute, Link, linkOptions } from '@tanstack/react-router'
import { btn } from '#/common/atoms/btn'
import { PageHeaderBackButton } from '#/common/molecules/page-header'
import { stylePageHeader } from '#/common/molecules/page-header/stylePageHeader'
import { SongLyricsPlayer } from '#/features/song/SongLyricsPlayer'

export const Route = createFileRoute('/apps/shirabe/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 mx-auto w-full'>
      <title>調べ</title>

      <header className={stylePageHeader()}>
        <div className='flex justify-start'>
          <PageHeaderBackButton to={linkOptions({ to: '/apps' }).to} />
        </div>

        <div className='text-mist-100 font-bold text-xl text-center'>調べ</div>

        <div className='flex justify-end items-center gap-1'>
          <Link to='/apps/shirabe/editor' className={btn({ isIcon: true })}>
            <PencilSimpleIcon size={24} />
          </Link>
        </div>
      </header>

      <main className='flex-1 flex flex-col overflow-y-auto min-h-0 gap-8 p-8'>
        <SongLyricsPlayer />
      </main>
    </div>
  )
}
