import {
  ContentItemFormat,
  zContentItemFormat,
  zContentUnitType,
  zGenre,
  zLocationType,
} from "#/common/api/client"
import { z } from "zod"

export const ContentItemFormSchema = z
  .object({
    fullTitle: z.string().min(1),
    nickName: z.string(),
    format: zContentItemFormat,
    isSecret: z.boolean(),
    isBookmarked: z.boolean(),
    isFavorite: z.boolean(),
    coverImagePath: z.string(),

    // location
    hasLocation: z.boolean(),
    locationType: zLocationType.optional(),
    locationValue: z.string().optional(),

    // unit spec
    hasUnitSpec: z.boolean(),
    unitType: zContentUnitType,
    isOngoing: z.boolean(),
    totalUnits: z.number().int(),

    tags: z.array(z.string()),
    genres: z.array(zGenre),
  })
  .superRefine((data, ctx) => {
    if (data.hasUnitSpec && data.unitType === undefined) {
      ctx.addIssue({ code: "custom", path: ["unitType"], message: "Required" })
    }
    if (data.hasUnitSpec && !data.isOngoing && data.totalUnits === undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["totalUnits"],
        message: "Required when not ongoing",
      })
    }
    if (data.hasLocation && !data.locationType) {
      ctx.addIssue({
        code: "custom",
        path: ["locationType"],
        message: "Required",
      })
    }
    if (data.hasLocation && !data.locationValue) {
      ctx.addIssue({
        code: "custom",
        path: ["locationValue"],
        message: "Required",
      })
    }
  })

export type ContentItemFormValues = z.infer<typeof ContentItemFormSchema>

export const contentItemFormEmptyValues: ContentItemFormValues = {
  fullTitle: "",
  nickName: "",
  format: ContentItemFormat.READABLE,
  isSecret: false,
  isBookmarked: false,
  isFavorite: false,
  coverImagePath: "",
  hasLocation: false,
  locationType: undefined,
  locationValue: undefined,
  hasUnitSpec: false,
  unitType: "Unknown",
  isOngoing: false,
  totalUnits: 0,
  tags: [],
  genres: [],
}
