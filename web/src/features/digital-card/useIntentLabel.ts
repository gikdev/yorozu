import type { Intent } from "./Intent"
import { intentLabels } from "./intentLabels"
import { useLang } from "./useLang"

export function useIntentLabel(intent: Intent) {
  const lang = useLang()
  return intentLabels[intent][lang]
}
