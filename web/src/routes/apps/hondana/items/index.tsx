import {
  ListPlusIcon,
  PlusIcon,
  SpinnerGapIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute, Link, linkOptions, useNavigate } from '@tanstack/react-router'
import { useMemo } from 'react'
import { listContentItemsOptions } from '#/common/api/client'
import { btn } from '#/common/atoms/btn'
import { extractErrorMessage } from '#/common/helpers/errors'
import { RenderQuery } from '#/common/helpers/render-query'
import { AppBar } from '#/common/molecules/page-header'
import { StateMessage } from '#/common/molecules/StateMessage'
import { ContentItemCard } from '#/features/content-items/ContentItemCard'
import { contentItemFilters } from '#/features/content-items/filters'
import z from 'zod'

const TITLE = 'Items'

const zParams = z.object({
  filter: z.string().optional(),
})

export const Route = createFileRoute('/apps/hondana/items/')({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: LayoutComponent,
  validateSearch: zParams,
})

function LayoutComponent() {
  const search = Route.useSearch()
  const selectedFilterId = search.filter || "none"
  const navigate = useNavigate()
  const itemsQ = useQuery(listContentItemsOptions())

  const setSelectedFilterId = (id: string | null | undefined) => {
    navigate({
      to: "/apps/hondana/items",
      search: {
        filter: id || undefined,
      }
    })
  }

  // ── Find the selected filter ──────────────────────────
  const selectedFilter = useMemo(
    () =>
      contentItemFilters.find(f => f.id === selectedFilterId) ??
      contentItemFilters[0],
    [selectedFilterId],
  )

  // ── Apply filter to data ──────────────────────────────
  const filteredItems = useMemo(() => {
    if (!itemsQ.data?.items) return []
    return selectedFilter.applyFilter(itemsQ.data.items)
  }, [itemsQ.data?.items, selectedFilter])

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilterId(e.target.value)
  }

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 mx-auto w-full border-x border-mist-900'>
      <title>{TITLE}</title>

      <AppBar title={TITLE} parentPath={linkOptions({ to: '/apps/hondana' })}>
        <select
          value={selectedFilterId}
          onChange={handleFilterChange}
          className={btn({
            class:
              'rounded-none min-w-40 outline-0 ring-0 *:bg-mist-900 *:text-mist-100',
          })}
        >
          {contentItemFilters.map(filter => (
            <option key={filter.id} value={filter.id}>
              {filter.title}
            </option>
          ))}
        </select>

        <Link
          type='button'
          to='/apps/hondana/items/new'
          className={btn({ class: 'rounded-none shrink-0', isIcon: true })}
        >
          <PlusIcon size={20} />
        </Link>
      </AppBar>

      <main className='flex-1 flex min-h-0 overflow-y-auto scrollbar-none hover:scrollbar-thin'>
        <RenderQuery
          isList={true}
          status={itemsQ.status}
          listCount={filteredItems.length}
          errorView={
            <StateMessage
              icon={WarningCircleIcon}
              title='Failed to load content items'
              className='h-full'
              description={extractErrorMessage(itemsQ.error)}
              mode='ERROR'
              retry={itemsQ.refetch}
            />
          }
          loadingView={
            <StateMessage
              mode='LOADING'
              className='h-full'
              icon={SpinnerGapIcon}
              title='Please wait.'
              description='Loading content items...'
            />
          }
          emptyView={
            <StateMessage
              mode='NORMAL'
              className='h-full'
              icon={ListPlusIcon}
              title={
                selectedFilterId === 'none'
                  ? 'No content items yet'
                  : `No items match the "${selectedFilter.title}" filter`
              }
              description={
                selectedFilterId === 'none'
                  ? 'Create your first content item!'
                  : `Try changing the filter or create a new item.`
              }
            />
          }
          fullView={() => (
            <div className='flex flex-wrap content-start gap-2 p-4'>
              {filteredItems.map(item => (
                <ContentItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  coverImageUrl={item.coverImageUrl}
                  placeholderLetter={item.placeholderLetter}
                  isFavorited={item.isFavorited}
                  isBookmarked={item.isBookmarked}
                  isSecret={item.isSecret}
                  isOngoing={item.isOngoing}
                  locationType={item.locationType}
                  locationValue={item.locationValue}
                  format={item.format}
                />
              ))}
            </div>
          )}
        />
      </main>
    </div>
  )
}
