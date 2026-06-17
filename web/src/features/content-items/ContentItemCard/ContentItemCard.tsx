import {
  BookmarkSimpleIcon,
  HeartIcon,
  LockKeyIcon,
  ClockIcon,
  QuestionIcon,
} from "@phosphor-icons/react"
import { ContentItemCardImage } from "./ContentItemCardImage"
import { contentItemFormatIconMap } from "../contentItemFormatIconMap"
import type { ContentItemFormat } from "#/common/api/client"
import { useIsUnlocked } from "#/features/secret-mode/useSecretModeStore"

interface ContentItemCardProps {
  id: string
  coverImageUrl: string | null
  title: string
  isBookmarked: boolean
  isSecret: boolean
  isFavorite: boolean
  isOngoing: boolean | null
  placeholderLetter: string
  format: ContentItemFormat
  onDetails: () => void
}

export function ContentItemCard(p: ContentItemCardProps) {
  const isUnlocked = useIsUnlocked()
  const FormatIcon = contentItemFormatIconMap[p.format]

  return (
    <button
      onClick={p.onDetails}
      className="flex flex-col rounded-lg bg-mist-900 border border-mist-800 cursor-pointer hover:-translate-y-1 transition-all duration-200 max-h-max"
    >
      <ContentItemCardImage
        src={p.coverImageUrl}
        alt={p.title}
        fallbackLetter={p.placeholderLetter}
      />

      <p className="font-bold text-mist-100 truncate px-4 py-2">{p.title}</p>

      <div className="flex items-center justify-center gap-1 text-mist-300 px-4 pt-2 pb-4">
        <FormatIcon size={20} weight="fill" />

        {p.isOngoing === null ? (
          <QuestionIcon size={20} />
        ) : (
          <ClockIcon
            size={20}
            weight="fill"
            className={p.isOngoing ? "text-cyan-400" : "text-green-400"}
          />
        )}

        <BookmarkSimpleIcon
          size={20}
          weight={p.isBookmarked ? "fill" : "regular"}
          className={p.isBookmarked ? "text-yellow-400" : ""}
        />

        <HeartIcon
          size={20}
          weight={p.isFavorite ? "fill" : "regular"}
          className={p.isFavorite ? "text-red-400" : ""}
        />

        {isUnlocked && (
          <LockKeyIcon
            size={20}
            weight={p.isSecret ? "fill" : "regular"}
            className={p.isSecret ? "text-purple-400" : ""}
          />
        )}

        {/* TODO: Don't forget to later re-add this */}
        {/* <QueueIcon
          size={20}
          weight={p.hasAnyTracks ? "fill" : "regular"}
          className={p.hasAnyTracks ? "text-blue-400" : ""}
        /> */}
      </div>
    </button>
  )
}
