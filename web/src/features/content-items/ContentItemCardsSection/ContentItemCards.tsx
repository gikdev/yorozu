import type { ContentItemResponse } from "#/common/api/client"
import { ContentItemCard } from "../ContentItemCard/ContentItemCard"

export const ContentItemCards = (p: {
  items: ContentItemResponse[]
}) => (
  <main className="flex-1 p-4 overflow-y-auto min-h-0 flex flex-row gap-2 flex-wrap items-start justify-start content-start justify-items-start">
    {p.items.map(ci => (
      <ContentItemCard
        id={ci.id}
        key={ci.id}
        title={ci.title}
        coverImageUrl={ci.coverImageUrl}
        format={ci.format}
        isBookmarked={ci.isBookmarked}
        isFavorite={ci.isFavorite}
        isOngoing={ci.unitSpec?.isOngoing ?? null}
        isSecret={ci.isSecret}
        placeholderLetter={ci.placeholderLetter}
      />
    ))}
  </main>
)
