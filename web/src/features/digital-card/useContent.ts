import { contents } from "./contents"
import { useLang } from "./useLang"

export function useContent() {
  const lang = useLang()
  return contents[lang]
}
