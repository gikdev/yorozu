import type { LyricLinesFormValues } from './LyricLinesFormSchema'

const STORAGE_KEY = 'shirabe:wip'

export function saveLyricLines(values: LyricLinesFormValues) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
}

export function loadLyricLines(): LyricLinesFormValues | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearLyricLines() {
  localStorage.removeItem(STORAGE_KEY)
}
