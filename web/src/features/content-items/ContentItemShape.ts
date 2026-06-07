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
    id: "2",
    title: "三体",
    format: "readable",
    isSecret: true,
    isBookmarked: false,
    isFavorite: false,
    isOngoing: false,
    totalUnits: 320,
    unitType: "pages",
    hasAnyTracks: false,
    coverImageUrl: null,
    placeholderLetter: "三",
  },
  {
    id: "3",
    title: "葬送のフリーレン",
    format: "watchable",
    isSecret: false,
    isBookmarked: false,
    isFavorite: true,
    isOngoing: false,
    totalUnits: 1200,
    unitType: "minutes",
    hasAnyTracks: true,
    coverImageUrl: "https://cdn.myanimelist.net/images/anime/1015/138006.jpg",
    placeholderLetter: "葬",
  },

  // New items with variety

  {
    id: "4",
    title: "بوف کور",
    format: "readable",
    isSecret: false,
    isBookmarked: false,
    isFavorite: true,
    isOngoing: false,
    totalUnits: 120,
    unitType: "pages",
    hasAnyTracks: false,
    coverImageUrl: null,
    placeholderLetter: "ب",
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
    id: "6",
    title: "君の名は。",
    format: "watchable",
    isSecret: false,
    isBookmarked: false,
    isFavorite: true,
    isOngoing: false,
    totalUnits: 1,
    unitType: "film",
    hasAnyTracks: true,
    coverImageUrl: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
    placeholderLetter: "君",
  },
  {
    id: "7",
    title: "ベルセルク",
    format: "readable",
    isSecret: true,
    isBookmarked: true,
    isFavorite: true,
    isOngoing: true,
    totalUnits: null,
    unitType: "chapters",
    hasAnyTracks: true,
    coverImageUrl: "https://cdn.myanimelist.net/images/manga/1/157751.jpg",
    placeholderLetter: "ベ",
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
    coverImageUrl: null,
    placeholderLetter: "A",
  },
  {
    id: "9",
    title: "دیوان حافظ",
    format: "readable",
    isSecret: false,
    isBookmarked: false,
    isFavorite: true,
    isOngoing: false,
    totalUnits: 500,
    unitType: "pages",
    hasAnyTracks: false,
    coverImageUrl: null,
    placeholderLetter: "د",
  },
  {
    id: "10",
    title: "Severance",
    format: "watchable",
    isSecret: true,
    isBookmarked: true,
    isFavorite: true,
    isOngoing: true,
    totalUnits: 9,
    unitType: "episodes",
    hasAnyTracks: true,
    coverImageUrl:
      "https://image.tmdb.org/t/p/w500/pPHOqdfGPJ7VfM6HH7qyM6wjWBf.jpg",
    placeholderLetter: "S",
  },
]
