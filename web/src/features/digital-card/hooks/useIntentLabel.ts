import { intentLabels } from "../data/intentLabels"
import type { Intent } from "../types/Intent"
import { useLang } from "./useLang"

export function useIntentLabel(intent: Intent) {
  const lang = useLang()
  return intentLabels[intent][lang]
}
