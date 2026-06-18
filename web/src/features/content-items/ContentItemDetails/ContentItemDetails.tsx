import type { ContentItemResponse } from "#/common/api/client"
import { tv } from "tailwind-variants"
import { ChipsSection } from "./ChipsSection"
import { CoverImage } from "./CoverImage"
import { ActionBar } from "./ActionBar"
import { TracksSection } from "#/features/consumption-tracks/TracksSection"
import { GoogleLogoIcon, ClipboardIcon } from "@phosphor-icons/react"

const styleContentItemDetailsContainer = tv({
  base: "flex flex-col gap-4 flex-1",
})
const styleCoverImageContainer = tv({
  base: "flex flex-row items-center gap-0 border border-mist-800 mx-auto rounded-lg overflow-clip",
})
const styleSubtitle = tv({ base: "text-xs" })
const styleTitle = tv({ base: "text-2xl font-bold text-mist-100" })
const styleTitleContainer = tv({
  base: "flex flex-col items-center gap-2 text-center",
})
const styleTextWithActions = tv({
  base: "flex items-center justify-center gap-1",
})
const styleInlineBtn = tv({
  base: "text-mist-400 hover:text-mist-100 transition-colors shrink-0 size-8 flex items-center justify-center rounded-lg hover:bg-mist-900",
})

function TextWithActions({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const sel = window.getSelection()
      const range = document.createRange()
      const span = document.querySelector(`[data-copy-target="${text}"]`)
      if (span) {
        range.selectNodeContents(span)
        sel?.removeAllRanges()
        sel?.addRange(range)
      }
    }
  }

  return (
    <span className={styleTextWithActions()}>
      <a
        href={`https://www.google.com/search?q=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styleInlineBtn()}
        title={`Search "${text}" on Google`}
      >
        <GoogleLogoIcon size={16} />
      </a>

      <span data-copy-target={text} className={className}>
        {text}
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className={styleInlineBtn()}
        title={`Copy "${text}"`}
      >
        <ClipboardIcon size={16} />
      </button>
    </span>
  )
}

interface ContentItemDetailsProps {
  item: ContentItemResponse
}

export function ContentItemDetails(p: ContentItemDetailsProps) {
  const {
    id,
    coverImageUrl,
    format,
    fullTitle,
    isBookmarked,
    isSecret,
    isFavorite,
    location,
    nickName,
    placeholderColor,
    placeholderLetter,
    tags,
    title,
    unitSpec,
  } = p.item

  return (
    <div className={styleContentItemDetailsContainer()}>
      <div className={styleCoverImageContainer()}>
        <CoverImage
          coverImageUrl={coverImageUrl}
          placeholderColor={placeholderColor}
          placeholderLetter={placeholderLetter}
          title={title}
        />

        <ActionBar
          id={id}
          isBookmarked={isBookmarked}
          isFavorite={isFavorite}
          isSecret={isSecret}
          location={location}
        />
      </div>

      <div className={styleTitleContainer()}>
        <h1 className={styleTitle()}>
          <TextWithActions text={title} className={styleTitle()} />
        </h1>
        {nickName && (
          <p className={styleSubtitle()}>
            <TextWithActions text={fullTitle} className={styleSubtitle()} />
          </p>
        )}
      </div>

      <ChipsSection format={format} tags={tags} unitSpec={unitSpec} />

      <TracksSection id={id} />
    </div>
  )
}
