import type { LyricLineShape } from "./LyricLineShape"
import type { EnabledLanguages } from "./SongDetails"

interface LyricLineProps {
  line: LyricLineShape
  enabled: EnabledLanguages
  defaultPrimaryLanguage: string
}

export const LyricLine = ({
  line,
  enabled,
  defaultPrimaryLanguage,
}: LyricLineProps) => {
  // Determine which languages actually have text in this line
  const presentLanguages = (["ja", "romaji", "en", "fa"] as const).filter(
    lang => line[lang],
  )
  const isSingleLanguage = presentLanguages.length === 1

  // Order of display: always ja -> romaji -> en -> fa
  const order = ["ja", "romaji", "en", "fa"] as const
  const showAny = order.some(lang => enabled[lang] && line[lang])

  if (!showAny) return null

  return (
    <div className="py-2 border-l-2 border-transparent hover:border-sky-300 dark:hover:border-sky-600 pl-4 transition-all">
      <div className="flex flex-col gap-1">
        {order.map(lang => {
          const text = line[lang as keyof LyricLineShape]
          if (!text || !enabled[lang]) return null

          // Determine if this language should have primary styling
          let isPrimary = false
          if (isSingleLanguage) {
            // Single language line → always primary
            isPrimary = true
          } else {
            // Multiple languages → primary only if this lang matches default
            isPrimary = lang === defaultPrimaryLanguage
          }

          return (
            <div
              key={lang}
              className={`${
                isPrimary
                  ? "text-2xl text-mist-900 dark:text-white"
                  : "text-base text-mist-600 dark:text-mist-400"
              }`}
              lang={lang}
            >
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
