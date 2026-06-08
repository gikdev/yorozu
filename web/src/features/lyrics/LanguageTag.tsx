import { getLanguageName } from "./getLanguageName"

interface LanguageTagProps {
  language: string
  className?: string
}

export const LanguageTag = ({ language, className = "" }: LanguageTagProps) => {
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full bg-mist-100 dark:bg-mist-700 text-xs font-medium text-mist-700 dark:text-mist-300 ${className}`}
    >
      {getLanguageName(language)}
    </div>
  )
}
