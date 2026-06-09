import type { Intent } from "./Intent"
import type { MultilingualString } from "./MultilingualString"

export const intentLabels: Record<Intent, MultilingualString> = {
  message: { en: "Message Me", fa: "پیغام بده", ja: "メッセージ" },
  learn: { en: "Learn", fa: "یاد بگیر", ja: "学ぶ" },
  follow: { en: "Follow", fa: "دنبال کن", ja: "フォロー" },
  work: { en: "Work", fa: "کارها", ja: "仕事" },
}
