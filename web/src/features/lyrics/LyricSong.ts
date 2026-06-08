import type { LyricLanguage } from "./LyricLanguage"
import type { LyricLineShape } from "./LyricLineShape"

export interface LyricSong {
  id: string
  title: string
  artist?: string
  audioUrl?: string | null
  animeTitle: string
  animeUrl: string
  lines: LyricLineShape[]
  defaultPrimaryLanguage: LyricLanguage
}
