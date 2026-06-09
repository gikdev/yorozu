import type { MultilingualString } from "./MultilingualString"
import { useLang } from "./useLang"

export function useT(str: MultilingualString): string {
  const lang = useLang()
  return str[lang]
}
