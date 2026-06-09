import type { Lang } from "./lang"
import type { Content } from "./Content"

export const contents: Record<Lang, Content> = {
  en: {
    fullName: "Mohammad Mahdi Bahrami",
    nickname: "Spec",
    tagline: "Fullstack web app developer · programming educator",
    description:
      "I build web apps and share what I learn — programming on my professional channels, and whatever's on my mind (languages, books, life, random thoughts) on my personal ones.",
  },
  fa: {
    fullName: "محمدمهدی بهرامی",
    nickname: "اسپک",
    tagline: "توسعه‌دهنده فول‌استک · مدرس برنامه‌نویسی",
    description:
      "اپ می‌سازم و یاد می‌دم — برنامه‌نویسی در کانال‌های حرفه‌ای، و هر چیزی که ذهنم درگیرشه (زبان، کتاب، زندگی، حرف‌های تصادفی) در کانال‌های شخصی.",
  },
  ja: {
    fullName: "バフラミ モハンマドマフディ",
    nickname: "スペク",
    tagline: "フルスタック開発者 · プログラミング講師",
    description:
      "Webアプリを作りながら、学んだことを発信しています。プロチャンネルではプログラミング、個人チャンネルでは言語・本・日常など気になることを何でも。",
  },
}
