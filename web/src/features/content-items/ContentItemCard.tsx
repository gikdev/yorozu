import {
  AirplayIcon,
  BookIcon,
  BookmarkSimpleIcon,
  HeadphonesIcon,
  HeartIcon,
  LinkIcon,
  LockKeyIcon,
  MapPinIcon,
  PuzzlePieceIcon,
  SquaresFourIcon,
  VideoIcon,
} from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import type { SyntheticEvent } from 'react'
import toast from 'react-hot-toast'
import {
  type ContentItemFormat,
  changeContentItemMutation,
  type LocationType,
  listContentItemsOptions,
} from '#/common/api/client'
import { btn } from '#/common/atoms/btn'
import { extractErrorMessage } from '#/common/helpers/errors'

// ── Types ──────────────────────────────────────────────
interface ContentItemCardProps {
  id: string
  title: string
  coverImageUrl: string | null
  placeholderLetter: string
  isFavorited: boolean
  isBookmarked: boolean
  isSecret: boolean
  isOngoing: boolean
  locationType: LocationType | null
  locationValue: string | null
  format: ContentItemFormat
}

// ── Helpers ────────────────────────────────────────────
function getFormatIcon(format: ContentItemFormat) {
  const map: Record<ContentItemFormat, typeof BookIcon> = {
    Readable: BookIcon,
    Watchable: VideoIcon,
    Listenable: HeadphonesIcon,
    Interactive: PuzzlePieceIcon,
    Mixed: SquaresFourIcon,
  }
  return map[format] ?? BookIcon
}

function getFormatColor(format: ContentItemFormat): string {
  const map: Record<ContentItemFormat, string> = {
    Readable: 'text-orange-400',
    Watchable: 'text-sky-400',
    Listenable: 'text-emerald-400',
    Interactive: 'text-purple-400',
    Mixed: 'text-mist-400',
  }
  return map[format] ?? ''
}

const iconBtnStyles = btn({
  isIcon: true,
  size: 'sm',
})

// ── Component ──────────────────────────────────────────
export function ContentItemCard(p: ContentItemCardProps) {
  const FormatIcon = getFormatIcon(p.format)
  const formatColor = getFormatColor(p.format)
  const changeM = useMutation({
    ...changeContentItemMutation(),
    onError: err => toast.error(extractErrorMessage(err)),
    onSuccess(_data, _variables, _onMutateResult, context) {
      context.client.invalidateQueries(listContentItemsOptions())
    },
  })

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget
    target.style.display = 'none'

    const parent = target.parentElement
    if (!parent) return

    const placeholder = parent.querySelector<HTMLDivElement>(
      '.placeholder-fallback',
    )
    if (!placeholder) return

    placeholder.style.display = 'flex'
  }

  const handleToggleFavorite = () => {
    changeM.mutate({
      path: { id: p.id },
      body: {
        isBookmarked: null,
        isFavorited: 'Toggle',
        isSecret: null,
      },
    })
  }

  const handleToggleBookmark = () => {
    changeM.mutate({
      path: { id: p.id },
      body: {
        isBookmarked: 'Toggle',
        isFavorited: null,
        isSecret: null,
      },
    })
  }

  const handleToggleSecret = () => {
    changeM.mutate({
      path: { id: p.id },
      body: {
        isBookmarked: null,
        isFavorited: null,
        isSecret: 'Toggle',
      },
    })
  }

  const handleLocation = () => {
    if (!p.locationValue) {
      toast.error('No location set.')
      return
    }

    navigator.clipboard
      .writeText(p.locationValue)
      .then(() => toast.success('Location copied!'))
      .catch(err => toast.error(extractErrorMessage(err)))
  }

  const hasLocation = p.locationType !== null
  const hasLink = p.locationType === 'Url'

  // ── Render ────────────────────────────────────────────
  return (
    <div className='group flex h-24 min-w-60 flex-1 overflow-hidden rounded-lg border border-mist-800/50 bg-mist-950/50 transition-all hover:border-mist-600 hover:bg-mist-900/70'>
      {/* ── Cover ── */}
      <Link
        to='/apps/hondana/items/$id' params={{ id: p.id }}
        className='relative aspect-square h-full shrink-0 overflow-hidden'
      >
        <img
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          src={p.coverImageUrl ?? undefined}
          alt={p.title}
          onError={handleImageError}
        />

        <div
          className='placeholder-fallback absolute inset-0 flex items-center justify-center bg-linear-to-br from-mist-800 to-mist-900 text-3xl font-bold text-mist-200'
          style={{ display: p.coverImageUrl ? 'none' : 'flex' }}
        >
          {p.placeholderLetter}
        </div>
      </Link>

      {/* ── Content ── */}
      <div className='flex flex-1 flex-col min-w-0 p-2'>
        {/* Title */}
        <Link to='/apps/hondana/items/$id' params={{ id: p.id }} className='truncate text-mist-100 wrap-anywhere'>
          {p.title}
        </Link>

        {/* Metadata Row */}
        <div className='flex items-center gap-1 text-xs text-mist-500'>
          <FormatIcon size={16} weight='duotone' className={formatColor} />

          {p.isOngoing && <AirplayIcon size={16} />}
        </div>

        {/* Actions */}
        <div className='mt-auto flex items-center justify-between'>
          {/* Toggle Buttons */}
          <div className='flex items-center'>
            <button
              type='button'
              onClick={handleToggleFavorite}
              disabled={changeM.isPending}
              className={iconBtnStyles}
              title={
                p.isFavorited ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <HeartIcon
                size={20}
                weight={p.isFavorited ? 'fill' : 'regular'}
                className={p.isFavorited ? 'text-red-400' : ''}
              />
            </button>

            <button
              type='button'
              onClick={handleToggleBookmark}
              disabled={changeM.isPending}
              className={iconBtnStyles}
              title={p.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <BookmarkSimpleIcon
                size={20}
                weight={p.isBookmarked ? 'fill' : 'regular'}
                className={p.isBookmarked ? 'text-yellow-400' : ''}
              />
            </button>

            <button
              type='button'
              disabled={changeM.isPending}
              onClick={handleToggleSecret}
              className={iconBtnStyles}
              title={p.isSecret ? 'Make public' : 'Make secret'}
            >
              <LockKeyIcon
                size={20}
                weight={p.isSecret ? 'fill' : 'regular'}
                className={p.isSecret ? 'text-violet-400' : ''}
              />
            </button>
          </div>

          {/* Location / Link */}
          {hasLocation && (
            <div className='flex items-center'>
              {hasLink ? (
                <a
                  href={p.locationValue ?? '#'}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={iconBtnStyles}
                >
                  <LinkIcon size={20} />
                </a>
              ) : (
                <button
                  type='button'
                  onClick={handleLocation}
                  className={iconBtnStyles}
                >
                  <MapPinIcon size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
