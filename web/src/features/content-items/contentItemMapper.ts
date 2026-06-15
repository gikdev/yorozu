import type { CreateContentItemRequest } from "#/common/api/client"
import type { ContentItemFormValues } from "./ContentItemForm"

export const contentItemMapper = {
  fromForm: {
    toCreateRequest(d: ContentItemFormValues): CreateContentItemRequest {
      return {
        format: d.format,
        fullTitle: d.fullTitle,
        coverImagePath: d.coverImagePath,
        genres: d.genres,
        nickName: d.nickName,
        tags: d.tags,
        isBookmarked: d.isBookmarked,
        isFavorite: d.isFavorite,
        isSecret: d.isSecret,
        location: d.hasLocation
          ? {
              type: d.locationType!,
              value: d.locationValue!,
            }
          : null,
        unitSpec: d.hasUnitSpec
          ? {
              isOngoing: d.isOngoing,
              unitType: d.unitType,
              totalUnits: d.isOngoing ? null : d.totalUnits,
            }
          : null,
      }
    },
  },
}
