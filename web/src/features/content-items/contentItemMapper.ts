import type { CreateContentItemRequest } from "#/common/api/client"
import type { ContentItemFormValues } from "./ContentItemForm"

export const contentItemMapper = {
  fromFormValues: {
    toCreateRequest: (i: ContentItemFormValues): CreateContentItemRequest => ({
      coverImageUrl: i.coverImageUrl || null,
      format: i.format,
      fullTitle: i.fullTitle,
      isBookmarked: i.isBookmarked,
      isFavorited: i.isFavorited,
      isOngoing: i.isOngoing,
      isSecret: i.isSecret,
      locationType: i.locationType || null,
      locationValue: i.locationValue || null,
      nickName: i.nickName || null,
      placeholderColor: null,
      tags: [...i.tags].map(t => t.trim()).filter(t => t.length > 0),
      totalUnits: i.totalUnits || null,
      unitType: i.unitType,
    }),
  },
}
