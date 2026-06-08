import type { ContentItemFormatType } from "./ContentItemFormatType"

export interface ContentItemCardShape {
  id: string
  title: string
  format: ContentItemFormatType
  isSecret: boolean
  isBookmarked: boolean
  isFavorite: boolean
  isOngoing: boolean
  totalUnits: number | null
  unitType: string
  hasAnyTracks: boolean
  coverImageUrl: string | null
  placeholderLetter: string
}

export const sampleContentItems: ContentItemCardShape[] = [
  {
    id: "1",
    title: "本好き S4",
    format: "watchable",
    isSecret: false,
    isBookmarked: true,
    isFavorite: true,
    isOngoing: true,
    totalUnits: 12,
    unitType: "episodes",
    hasAnyTracks: true,
    coverImageUrl:
      "https://animegate.ir/storage/anime/images/2024/10/1a69f7eb-c9a4-491a-98ad-3fc9882c77aa.webp",
    placeholderLetter: "本",
  },

  {
    id: "5",
    title: "Rust Programming: Zero to Production",
    format: "watchable",
    isSecret: false,
    isBookmarked: true,
    isFavorite: false,
    isOngoing: true,
    totalUnits: null,
    unitType: "hours",
    hasAnyTracks: true,
    coverImageUrl: null,
    placeholderLetter: "R",
  },
  {
    id: "8",
    title: "Atomic Habits",
    format: "readable",
    isSecret: false,
    isBookmarked: true,
    isFavorite: false,
    isOngoing: false,
    totalUnits: 320,
    unitType: "pages",
    hasAnyTracks: false,
    coverImageUrl:
      "https://dkstatics-public.digikala.com/digikala-products/120628475.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/format,webp/quality,q_90",
    placeholderLetter: "A",
  },
]
