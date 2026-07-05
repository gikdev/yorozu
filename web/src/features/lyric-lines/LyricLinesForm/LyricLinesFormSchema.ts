import { z } from 'zod'

export const languageKeys = [
  'persian',
  'english',
  'arabic',
  'spanish',
  'japanese',
  'romaji',
] as const
export type LanguageKey = (typeof languageKeys)[number]
export type TextFieldKey = LanguageKey | 'annotation'

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
    mainLanguage: z.enum([...languageKeys, 'annotation']).nullable(),
  })
  .superRefine((data, ctx) => {
    const annotationFilled = !!data.annotation
    const languagesFilled = languageKeys.filter(k => !!data[k])
    const anyFilled = annotationFilled || languagesFilled.length > 0

    if (annotationFilled && languagesFilled.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Annotation and language fields cannot coexist.',
        path: ['annotation'],
      })
    }

    if (!anyFilled) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one text field must be filled.',
        path: ['annotation'],
      })
    }

    if (anyFilled && data.mainLanguage === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'mainLanguage is required when any text field is filled.',
        path: ['mainLanguage'],
      })
    }

    if (data.mainLanguage !== null) {
      const targetFilled =
        data.mainLanguage === 'annotation'
          ? annotationFilled
          : !!data[data.mainLanguage]

      if (!targetFilled) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'mainLanguage must point to a filled field.',
          path: ['mainLanguage'],
        })
      }
    }
  })

export const lyricLinesFormSchema = z.object({
  lines: z.array(lyricLineSchema),
})

export const lyricLineSubmitSchema = lyricLineSchema.superRefine(
  (data, ctx) => {
    if (data.timestamp === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Timestamp is required before submitting.',
        path: ['timestamp'],
      })
    }
  },
)

export type LyricLine = z.infer<typeof lyricLineSchema>
export type LyricLinesFormValues = z.infer<typeof lyricLinesFormSchema>

export const emptyLyricLine = (): LyricLine => ({
  tempId: '', // filled with uuid at creation
  timestamp: null,
  annotation: null,
  persian: null,
  english: null,
  arabic: null,
  spanish: null,
  japanese: null,
  romaji: null,
  mainLanguage: null,
})

export const emptyLyricLinesFormValues: LyricLinesFormValues = {
  lines: [],
}
