import type { Intent } from "./Intent"
import type { MultilingualString } from "./MultilingualString"

export const intentLabels: Record<Intent, MultilingualString> = {
  message: { en: "Message", fa: "پیام", ja: "メッセージ" },
  learn: { en: "Learn", fa: "یادگیری", ja: "学ぶ" },
  follow: { en: "Follow", fa: "دنبال کن", ja: "フォロー" },
  work: { en: "Work", fa: "کارها", ja: "仕事" },
}
