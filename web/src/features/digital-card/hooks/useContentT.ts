import type { IContent } from '../types/IContent'
import { useContent } from './useContent'
import { useLang } from './useLang'

export const useContentT = (key: keyof IContent): string => {
  const lang = useLang()
  const content = useContent()

  return content[key][lang]
}
