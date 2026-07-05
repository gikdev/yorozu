import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface SongPlayerState {
  songUrl: string | null
  isPlaying: boolean
  currentTime: number
  totalTime: number | null

  play: () => void
  pause: () => void
  setCurrentTime: (currentTime: number) => void
  setTotalTime: (totalTime: number | null) => void
  setSongUrl: (songUrl: string | null) => void
}

export const useSongPlayerStore = create<SongPlayerState>()(
  devtools(set => ({
    songUrl: null,
    isPlaying: false,
    currentTime: 0,
    totalTime: null,

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    setCurrentTime: currentTime => set({ currentTime }),
    setTotalTime: totalTime => set({ totalTime }),
    setSongUrl: songUrl => set({ songUrl }),
  })),
)
