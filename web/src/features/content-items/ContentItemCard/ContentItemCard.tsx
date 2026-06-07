import {
  BookmarkSimpleIcon,
  HeartIcon,
  LockKeyIcon,
  QueueIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@phosphor-icons/react"
import type { ContentItemCardShape } from "../ContentItemShape"
import { ContentItemCardImage } from "./ContentItemCardImage"
import { contentItemFormatIconMap } from "../contentItemFormatIconMap"

interface ContentItemCardProps extends ContentItemCardShape {
  onDetails: () => void
}

export function ContentItemCard(p: ContentItemCardProps) {
  const FormatIcon = contentItemFormatIconMap[p.format]

  return (
    <button onClick={p.onDetails} className="flex flex-col rounded-lg bg-mist-900 border border-mist-800 cursor-pointer hover:-translate-y-1 transition-all duration-200">
      <ContentItemCardImage
        src={p.coverImageUrl}
        alt={p.title}
        fallbackLetter={p.placeholderLetter}
      />

      <p className="font-bold text-mist-100 truncate px-4 py-2">
        {p.title}
      </p>

      <div className="flex items-center justify-center gap-1 text-mist-300 px-4 py-2">
        <FormatIcon size={16} weight="fill" />

        {p.isOngoing ? (
          <ClockIcon size={16} />
        ) : (
          <CheckCircleIcon
            size={16}
            weight="fill"
            className="text-green-400"
          />
        )}

        <BookmarkSimpleIcon
          size={16}
          weight={p.isBookmarked ? "fill" : "regular"}
          className={p.isBookmarked ? "text-yellow-400" : ""}
        />

        <HeartIcon
          size={16}
          weight={p.isFavorite ? "fill" : "regular"}
          className={p.isFavorite ? "text-red-400" : ""}
        />

        <LockKeyIcon
          size={16}
          weight={p.isSecret ? "fill" : "regular"}
          className={p.isSecret ? "text-purple-400" : ""}
        />

        <QueueIcon
          size={16}
          weight={p.hasAnyTracks ? "fill" : "regular"}
          className={p.hasAnyTracks ? "text-blue-400" : ""}
        />
      </div>
    </button>
  )
}
