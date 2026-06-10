import type { Intent } from "../types/Intent"
import type { MultilingualString } from "../types/MultilingualString"

export const intentLabels: Record<Intent, MultilingualString> = {
  message: {
    en: "Message",
    fa: "پیام",
  },
  learn: {
    en: "Learn",
    fa: "آموزش",
  },
  follow: {
    en: "Follow",
    fa: "دنبال کن",
  },
  work: {
    en: "Work",
    fa: "پروژه‌ها",
  },
}
