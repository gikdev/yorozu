import { ListPlusIcon, XIcon } from '@phosphor-icons/react'
import {
  createFileRoute,
  linkOptions,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { cn } from 'tailwind-variants'
import { btn } from '#/common/atoms/btn'
import { AppBar } from '#/common/molecules/page-header'
import { ListsSidebar } from './-ListsSidebar'

const TITLE = 'Lists'

export const Route = createFileRoute('/apps/hondana/(lists)/lists')({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: LayoutComponent,
})

function LayoutComponent() {
  const navigate = useNavigate({ from: '/apps/hondana/lists' })
  const { pathname } = useLocation()
  const inEmptyPage = pathname === '/apps/hondana/lists'

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-360 mx-auto w-full border-x border-mist-900'>
      <title>{TITLE}</title>

      <AppBar title={TITLE} parentPath={linkOptions({ to: '/apps/hondana' })}>
        <button
          type='button'
          onClick={() => navigate({ to: '/apps/hondana/lists' })}
          className={btn({ class: 'rounded-none shrink-0', isIcon: true })}
        >
          <XIcon size={20} />
        </button>
        <button
          type='button'
          onClick={() => navigate({ to: '/apps/hondana/lists/new' })}
          className={btn({ class: 'rounded-none shrink-0', isIcon: true })}
        >
          <ListPlusIcon size={20} />
        </button>
      </AppBar>

      <main className='flex-1 flex min-h-0 overflow-hidden lg:flex-row flex-col'>
        <aside
          className={cn(
            'flex-1 border-b lg:border-r border-mist-900',
            'overflow-y-auto scrollbar-none hover:scrollbar-thin',
            { 'hidden lg:block': !inEmptyPage },
          )}
        >
          <ListsSidebar />
        </aside>

        <section
          className={cn('flex-3 lg:flex-2 overflow-y-auto p-4', {
            'hidden lg:block': inEmptyPage,
          })}
        >
          <Outlet />
        </section>
      </main>
    </div>
  )
}
