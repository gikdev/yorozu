import { useState } from "react"
import { changeContentItemMutation, ContentItemFormat, getContentItemOptions, listContentItemsOptions } from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { extractErrorMessage } from "#/common/helpers/errors"
import { RenderQuery } from "#/common/helpers/render-query"
import { CoverImage } from "#/common/molecules/CoverImage"
import { AppBar } from "#/common/molecules/page-header"
import { StateMessage } from "#/common/molecules/StateMessage"
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
  SpinnerGapIcon,
  SquaresFourIcon,
  VideoIcon,
  WarningCircleIcon,
  TagIcon,
  CopySimpleIcon
} from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, linkOptions } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { cn } from "tailwind-variants"

const TITLE = 'Item Details'
const useGetContentItem = (id: string) => useQuery(getContentItemOptions({ path: { id } }))
const iconBtnStyles = btn({ className: "flex-1 rounded-none", theme: "secondary" })
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
    Readable: 'text-blue-400',
    Watchable: 'text-red-400',
    Listenable: 'text-green-400',
    Interactive: 'text-purple-400',
    Mixed: 'text-yellow-400',
  }
  return map[format] ?? ''
}

export const Route = createFileRoute("/apps/hondana/items/$id")({
  component: RouteComponent,
})


function RouteComponent() {
  const { id } = Route.useParams()
  const itemQ = useGetContentItem(id)
  const [showTags, setShowTags] = useState(false)
  const changeM = useMutation({
    ...changeContentItemMutation(),
    onError: err => toast.error(extractErrorMessage(err)),
    onSuccess(_data, _variables, _onMutateResult, context) {
      context.client.invalidateQueries(listContentItemsOptions())
      context.client.invalidateQueries(getContentItemOptions({ path: { id } }))
    },
  })

  const handleToggleFavorite = () => {
    changeM.mutate({
      path: { id },
      body: {
        isBookmarked: null,
        isFavorited: 'Toggle',
        isSecret: null,
      },
    })
  }

  const handleToggleBookmark = () => {
    changeM.mutate({
      path: { id },
      body: {
        isBookmarked: 'Toggle',
        isFavorited: null,
        isSecret: null,
      },
    })
  }

  const handleToggleSecret = () => {
    changeM.mutate({
      path: { id },
      body: {
        isBookmarked: null,
        isFavorited: null,
        isSecret: 'Toggle',
      },
    })
  }

  const handleLocation = () => {
    if (!itemQ.data?.locationValue) {
      toast.error('No location set.')
      return
    }

    navigator.clipboard
      .writeText(itemQ.data?.locationValue)
      .then(() => toast.success('Location copied!'))
      .catch(err => toast.error(extractErrorMessage(err)))
  }

  const handleCopyId = (idToCopy: string) => {
    navigator.clipboard.writeText(idToCopy)
      .then(() => toast.success('ID copied!'))
      .catch(err => toast.error(extractErrorMessage(err)))
  }

  return (
    <div className='h-dvh flex flex-col bg-mist-950 text-mist-400 max-w-240 mx-auto w-full border-x border-mist-900'>
      <title>{TITLE}</title>

      <AppBar
        title={TITLE}
        parentPath={linkOptions({ to: '/apps/hondana/items' })}
      />

      <main className='flex-1 flex flex-col p-4'>
        <RenderQuery
          isList={false}
          status={itemQ.status}
          item={itemQ.data!}
          errorView={
            <StateMessage
              icon={WarningCircleIcon}
              title='Failed to load content item'
              className='h-full'
              description={extractErrorMessage(itemQ.error)}
              mode='ERROR'
              retry={itemQ.refetch}
            />
          }
          loadingView={
            <StateMessage
              mode='LOADING'
              className='h-full'
              icon={SpinnerGapIcon}
              title='Please wait.'
              description='Loading content item...'
            />
          }
          successView={i => {
            const FormatIcon = getFormatIcon(i.format);
            const formatColor = getFormatColor(i.format);

            return (
              <div className="flex flex-col items-center gap-6 p-4 w-full">
                {/* Cover + actions */}
                <div className="flex flex-col items-center w-60 mx-auto overflow-clip rounded-lg">
                  <CoverImage
                    coverImageUrl={i.coverImageUrl}
                    className="w-60 aspect-3/4"
                    placeholderLetter={i.placeholderLetter}
                    title={i.title}
                  />

                  <div className="flex items-center justify-center w-full">
                    <button
                      type="button"
                      onClick={handleToggleFavorite}
                      disabled={changeM.isPending}
                      className={iconBtnStyles}
                      title={i.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <HeartIcon
                        size={24}
                        weight={i.isFavorited ? 'fill' : 'regular'}
                        className={i.isFavorited ? 'text-red-400' : ''}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleBookmark}
                      disabled={changeM.isPending}
                      className={iconBtnStyles}
                      title={i.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                    >
                      <BookmarkSimpleIcon
                        size={24}
                        weight={i.isBookmarked ? 'fill' : 'regular'}
                        className={i.isBookmarked ? 'text-yellow-400' : ''}
                      />
                    </button>

                    <button
                      type="button"
                      disabled={changeM.isPending}
                      onClick={handleToggleSecret}
                      className={iconBtnStyles}
                      title={i.isSecret ? 'Make public' : 'Make secret'}
                    >
                      <LockKeyIcon
                        size={24}
                        weight={i.isSecret ? 'fill' : 'regular'}
                        className={i.isSecret ? 'text-violet-400' : ''}
                      />
                    </button>

                    {i.locationValue && (
                      i.locationType === 'Url' ? (
                        <a
                          href={i.locationValue}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={iconBtnStyles}
                        >
                          <LinkIcon size={24} />
                        </a>
                      ) : (
                        <button type="button" onClick={handleLocation} className={iconBtnStyles}>
                          <MapPinIcon size={24} />
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Title & format */}
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-mist-100">{i.title}</h1>

                  {i.nickName && (
                    <p className="">{i.fullTitle}</p>
                  )}

                  <div className={cn("flex items-center justify-center gap-1 mt-1", formatColor)}>
                    <FormatIcon size={20} />
                    <span className="">{i.format}</span>
                    {i.isOngoing && <AirplayIcon size={20} />}
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="flex items-center justify-center gap-2 bg-mist-900/40 py-2 px-4 rounded-full">
                    <span className="text-lg font-semibold text-mist-100">{i.totalUnits || "??"}</span>
                    <span className="text-xs">{i.unitType}(s)</span>
                  </div>

                  {i.tags.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowTags(!showTags)}
                      className="flex items-center gap-1.5 bg-mist-900/60 hover:bg-mist-900/80 transition-colors rounded-full px-4 py-1.5 text-xs cursor-pointer"
                    >
                      <TagIcon size={16} />
                      <span>Tags</span>
                      <span className="text-xs opacity-60">
                        {showTags ? '▲' : '▼'}
                      </span>
                    </button>
                  )}
                </div>

                {showTags && (
                  <div className="flex flex-wrap gap-2 justify-center font-mono">
                    {[...i.tags].sort().map((tag) => (
                      <span
                        key={tag}
                        className="bg-mist-900 px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Metadata grid – ID (with copy), Created, Updated */}
                <div className="w-full bg-mist-900/50 rounded-lg p-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <span className="">ID</span>
                  <div className="flex items-center gap-2">
                    <code className="font-mono">{i.id}</code>

                    <button
                      type="button"
                      onClick={() => handleCopyId(i.id)}
                      className="hover:text-mist-100 transition-colors"
                      title="Copy ID"
                    >
                      <CopySimpleIcon size={14} />
                    </button>
                  </div>

                  <span className="">Created</span>
                  <span className="">
                    {new Date(i.createdAt).toLocaleDateString()}
                  </span>

                  <span className="">Updated</span>
                  <span className="">
                    {i.updatedAt
                      ? new Date(i.updatedAt).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
              </div>
            );
          }}
        />
      </main>
    </div>
  )
}
