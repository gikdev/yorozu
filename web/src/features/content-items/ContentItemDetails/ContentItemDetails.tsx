import type { ContentItemResponse } from "#/common/api/client"
import { tv } from "tailwind-variants"
import { ChipsSection } from "./ChipsSection"
import { CoverImage } from "./CoverImage"
import { ActionBar } from "./ActionBar"
import { TracksSection } from "#/features/consumption-tracks/TracksSection"

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
        <h1 className={styleTitle()}>{title}</h1>
        {nickName && <p className={styleSubtitle()}>{fullTitle}</p>}
      </div>

      <ChipsSection format={format} tags={tags} unitSpec={unitSpec} />

      <TracksSection id={id} />
    </div>
  )
}
