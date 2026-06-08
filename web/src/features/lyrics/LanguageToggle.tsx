interface LanguageToggleProps {
  lang: string
  label: string
  enabled: boolean
  onToggle: () => void
}

export const LanguageToggle = ({
  label,
  enabled,
  onToggle,
}: LanguageToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        enabled
          ? "bg-sky-500 text-white shadow-sm hover:bg-sky-600"
          : "bg-mist-100 dark:bg-mist-800 text-mist-600 dark:text-mist-400 hover:bg-mist-200 dark:hover:bg-mist-700"
      }`}
    >
      {label}
    </button>
  )
}
