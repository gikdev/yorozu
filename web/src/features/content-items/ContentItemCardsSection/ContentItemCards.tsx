import type { ContentItemResponse } from "#/common/api/client"
import { ContentItemCard } from "../ContentItemCard/ContentItemCard"

export const ContentItemCards = (p: { items: ContentItemResponse[] }) => (
  <main className="flex-1 p-4 flex flex-col gap-2">
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
