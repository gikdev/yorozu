import { create } from 'zustand'
import type { Lang } from '../types/lang'

interface DigitalCardState {
  lang: Lang
  open: boolean
  setLang: (lang: Lang) => void
  setOpen: (open: boolean) => void
}

export const useDigitalCardStore = create<DigitalCardState>(set => ({
  lang: 'fa',
  open: false,
  setLang: lang => set({ lang }),
  setOpen: open => set({ open }),
}))
