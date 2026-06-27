import { z } from "zod"

const languageKeys = [
  "persian",
  "english",
  "arabic",
  "spanish",
  "japanese",
  "romaji",
  "annotation",
] as const

const nullableText = z.string().min(1).nullable()

export const lyricLineSchema = z
  .object({
    tempId: z.string(),
    timestamp: z.number().nullable(),
    annotation: nullableText,
    persian: nullableText,
    english: nullableText,
    arabic: nullableText,
    spanish: nullableText,
    japanese: nullableText,
    romaji: nullableText,
    mainLanguage: z.enum(languageKeys).nullable(),
  })
  .superRefine((data, ctx) => {
    const annotationFilled = !!data.annotation
    const languagesFilled = languageKeys.filter(k => !!data[k])

    // annotation XOR languages
    if (annotationFilled && languagesFilled.length > 0) {
      ctx.addIssue({
        code: "custom",
        message: "Annotation and language fields cannot coexist.",
        path: ["annotation"],
      })
    }

    // at least one text field must be filled
    if (!annotationFilled && languagesFilled.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "At least one text field must be filled.",
        path: ["annotation"],
      })
    }

    // mainLanguage must match a filled field
    if (data.mainLanguage !== null) {
      const targetFilled =
        data.mainLanguage === "annotation"
          ? annotationFilled
          : !!data[data.mainLanguage]

      if (!targetFilled) {
        ctx.addIssue({
          code: "custom",
          message: "mainLanguage must point to a filled field.",
          path: ["mainLanguage"],
        })
      }
    }

    const anyFilled = annotationFilled || languagesFilled.length > 0
    if (anyFilled && data.mainLanguage === null) {
      ctx.addIssue({
        code: "custom",
        message: "mainLanguage is required when any text field is filled.",
        path: ["mainLanguage"],
      })
    }
  })

export const lyricLineSubmitSchema = lyricLineSchema.superRefine(
  (data, ctx) => {
    if (data.timestamp === null) {
      ctx.addIssue({
        code: "custom",
        message: "Timestamp is required before submitting.",
        path: ["timestamp"],
      })
    }
  },
)

export type LyricLine = z.infer<typeof lyricLineSchema>
