export const getLanguageName = (lang: string): string => {
  const map: Record<string, string> = {
    ja: "日本語",
    en: "English",
    romaji: "Romaji",
    fa: "فارسی",
  }
  return map[lang] || lang
}
