import {
  BookmarkSimpleIcon,
  HeartIcon,
  QuestionIcon,
  LockKeyIcon,
  AirplayIcon,
  CheckCircleIcon,
} from "@phosphor-icons/react"
import { ContentItemCardImage } from "./ContentItemCardImage"
import { contentItemFormatIconMap } from "../contentItemFormatIconMap"
import type { ContentItemFormat } from "#/common/api/client"
import { useIsUnlocked } from "#/features/secret-mode/useSecretModeStore"
import { tv } from "tailwind-variants"
import { Link } from "@tanstack/react-router"

const styleCardContainer = tv({
  base: `
    flex rounded-lg overflow-clip border
    cursor-pointer transition-all duration-200
    h-24 w-full
  `,
  variants: {
    isSecret: {
      false: "bg-mist-900 hover:bg-mist-800 border-mist-800",
      true: "bg-violet-950/20 hover:bg-violet-950/40 border-violet-800",
    },
  },
  defaultVariants: {
    isSecret: false,
  },
})

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
}

export function ContentItemCard(p: ContentItemCardProps) {
  const isUnlocked = useIsUnlocked()
  const isSecret = p.isSecret && isUnlocked
  const FormatIcon = contentItemFormatIconMap[p.format]

  return (
    <div className={styleCardContainer({ isSecret })}>
      <ContentItemCardImage
        src={p.coverImageUrl}
        alt={p.title}
        fallbackLetter={p.placeholderLetter}
      />

      <div className="flex-1 flex flex-col gap-2 justify-center p-2">
        <Link
          className="text-mist-100 hover:underline py-4 text-center hover:text-sky-400 line-clamp-3 font-bold"
          dir="auto"
          to="/apps/hondana/library/$id"
          params={{ id: p.id }}
        >
          {p.title}
        </Link>
      </div>

      <div className="items-center justify-center justify-items-center aspect-square grid grid-cols-2 border-s border-mist-800 relative">
        <FormatIcon size={24} weight="fill" className="text-mist-100" />

        {p.isOngoing === null && (
          <QuestionIcon size={24} weight="regular" className="text-mist-400" />
        )}
        {p.isOngoing === true && (
          <AirplayIcon size={24} weight="fill" className="text-cyan-400" />
        )}
        {p.isOngoing === false && (
          <CheckCircleIcon size={24} weight="fill" className="text-green-400" />
        )}

        <BookmarkSimpleIcon
          size={24}
          weight={p.isBookmarked ? "fill" : "regular"}
          className={p.isBookmarked ? "text-yellow-400" : ""}
        />

        <HeartIcon
          size={24}
          weight={p.isFavorite ? "fill" : "regular"}
          className={p.isFavorite ? "text-red-400" : ""}
        />

        <LockKeyIcon
          size={24}
          weight={isSecret ? "fill" : "regular"}
          className={`absolute top-1/2 left-1/2 -translate-1/2 ${isSecret && "text-purple-400"} ${!isUnlocked && "hidden"}`}
        />
      </div>
    </div>
  )
}
