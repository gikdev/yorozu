import type { ContentItemMiniResponse } from '#/common/api/client'

export interface IContentItemFilter {
  id: string
  title: string
  applyFilter: (items: ContentItemMiniResponse[]) => ContentItemMiniResponse[]
}

// ── All Filters ──────────────────────────────────────────
export const contentItemFilters: IContentItemFilter[] = [
  {
    id: 'none',
    title: 'No Filter',
    applyFilter: items => items,
  },
  {
    id: 'favorited',
    title: 'Favorited',
    applyFilter: items => items.filter(item => item.isFavorited),
  },
  {
    id: 'bookmarked',
    title: 'Bookmarked',
    applyFilter: items => items.filter(item => item.isBookmarked),
  },
  {
    id: 'secret',
    title: 'Secret',
    applyFilter: items => items.filter(item => item.isSecret),
  },
  {
    id: 'public',
    title: 'Public',
    applyFilter: items => items.filter(item => !item.isSecret),
  },
  {
    id: 'ongoing',
    title: 'Ongoing',
    applyFilter: items => items.filter(item => item.isOngoing),
  },
  {
    id: 'finished',
    title: 'Finished',
    applyFilter: items => items.filter(item => !item.isOngoing),
  },
  {
    id: 'watchable',
    title: 'Watchable',
    applyFilter: items => items.filter(item => item.format === 'Watchable'),
  },
  {
    id: 'readable',
    title: 'Readable',
    applyFilter: items => items.filter(item => item.format === 'Readable'),
  },
  {
    id: 'listenable',
    title: 'Listenable',
    applyFilter: items => items.filter(item => item.format === 'Listenable'),
  },
  {
    id: 'interactive',
    title: 'Interactive',
    applyFilter: items => items.filter(item => item.format === 'Interactive'),
  },
  {
    id: 'mixed',
    title: 'Mixed',
    applyFilter: items => items.filter(item => item.format === 'Mixed'),
  },
]
