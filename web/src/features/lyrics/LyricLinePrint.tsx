import type { LyricLineShape } from "./LyricLineShape"

interface LyricLinePrintProps {
  line: LyricLineShape
  enabled: { ja: boolean; romaji: boolean; en: boolean; fa: boolean }
  defaultPrimaryLanguage: string
}

export const LyricLinePrint = ({
  line,
  enabled,
  defaultPrimaryLanguage,
}: LyricLinePrintProps) => {
  const order = ["ja", "romaji", "en", "fa"] as const

  // Determine which languages actually have text in this line
  const presentLanguages = order.filter(lang => line[lang])
  const isSingleLanguage = presentLanguages.length === 1

  const hasAny = order.some(lang => enabled[lang] && line[lang])
  if (!hasAny) return null

  return (
    <div className="mb-6 last:mb-0">
      {order.map(lang => {
        const text = line[lang as keyof LyricLineShape]
        if (!text || !enabled[lang]) return null

        let isPrimary = false
        if (isSingleLanguage) {
          isPrimary = true
        } else {
          isPrimary = lang === defaultPrimaryLanguage
        }

        return (
          <div key={lang} className="mb-2 last:mb-0">
            <div
              className={`${
                isPrimary
                  ? "text-2xl font-medium text-white print:text-black"
                  : "text-lg text-gray-300 print:text-gray-700"
              }`}
              dangerouslySetInnerHTML={{ __html: text }}
            />
          </div>
        )
      })}
    </div>
  )
}
