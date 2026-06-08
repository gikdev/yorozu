import type { LyricLanguage } from "./LyricLanguage"

export interface LyricLineShape extends Partial<Record<LyricLanguage, string>> {
  primaryLanguage?: LyricLanguage
}
