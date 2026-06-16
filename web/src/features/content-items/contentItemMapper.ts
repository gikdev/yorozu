import type {
  ContentItemResponse,
  CreateContentItemRequest,
  UpdateContentItemRequest,
} from "#/common/api/client"
import type { ContentItemFormValues } from "./ContentItemForm"

export const contentItemMapper = {
  fromResponse: {
    toForm: (data: ContentItemResponse): ContentItemFormValues => ({
      coverImagePath: data.coverImageUrl || "",
      format: data.format,
      fullTitle: data.fullTitle,
      genres: data.genres,
      hasLocation: data.location != null,
      hasUnitSpec: data.unitSpec != null,
      isBookmarked: data.isBookmarked,
      isFavorite: data.isFavorite,
      isSecret: data.isSecret,
      isOngoing: data.unitSpec?.isOngoing ?? false,
      nickName: data.nickName || "",
      tags: data.tags,
      totalUnits: data.unitSpec?.totalUnits ?? 0,
      unitType: data.unitSpec?.unitType ?? "Unknown",
      locationType: data.location?.type,
      locationValue: data.location?.value,
    }),
  },
  fromForm: {
    toCreateRequest: (
      data: ContentItemFormValues,
    ): CreateContentItemRequest => ({
      format: data.format,
      fullTitle: data.fullTitle,
      coverImagePath: data.coverImagePath || null,
      genres: data.genres,
      nickName: data.nickName || null,
      tags: data.tags,
      isBookmarked: data.isBookmarked,
      isFavorite: data.isFavorite,
      isSecret: data.isSecret,
      location: data.hasLocation
        ? {
            type: data.locationType!,
            value: data.locationValue!,
          }
        : null,
      unitSpec: data.hasUnitSpec
        ? {
            isOngoing: data.isOngoing,
            unitType: data.unitType,
            totalUnits: data.isOngoing ? null : data.totalUnits,
          }
        : null,
    }),
    toUpdateRequest: (
      data: ContentItemFormValues,
    ): UpdateContentItemRequest => ({
      format: data.format,
      fullTitle: data.fullTitle,
      coverImagePath: data.coverImagePath || null,
      genres: data.genres,
      nickName: data.nickName || null,
      tags: data.tags,
      isBookmarked: data.isBookmarked,
      isFavorite: data.isFavorite,
      isSecret: data.isSecret,
      location: data.hasLocation
        ? {
            type: data.locationType!,
            value: data.locationValue!,
          }
        : null,
      unitSpec: data.hasUnitSpec
        ? {
            isOngoing: data.isOngoing,
            unitType: data.unitType,
            totalUnits: data.isOngoing ? null : data.totalUnits,
          }
        : null,
    }),
  },
}
