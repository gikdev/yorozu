import { createStore } from '@tanstack/react-store'

type SongPlayerValue = {
  songUrl: string | null
  isPlaying: boolean
  currentTime: number
  totalTime: number | null
}

const initialValue: SongPlayerValue = {
  songUrl: null,
  isPlaying: false,
  currentTime: 0,
  totalTime: null,
}

export const songPlayerStore = createStore(initialValue, ({ setState }) => ({
  play: () => setState(prev => ({ ...prev, isPlaying: true })),
  pause: () => setState(prev => ({ ...prev, isPlaying: false })),
  setCurrentTime: (currentTime: number) =>
    setState(prev => ({ ...prev, currentTime })),
  setTotalTime: (totalTime: number | null) =>
    setState(prev => ({ ...prev, totalTime })),
  setSongUrl: (songUrl: string | null) =>
    setState(prev => ({ ...prev, songUrl })),
}))
