import { createStore } from '@tanstack/react-store'

export const playbackSpeedValues = [0.5, 1, 1.5, 2, 2.5, 3] as const
export type PlaybackSpeed = (typeof playbackSpeedValues)[number]

export const volumeLevelValues = ['muted', 'low', 'medium', 'high'] as const
export type VolumeLevel = (typeof volumeLevelValues)[number]

export const skipRangeValues = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 30, 60] as const
export type SkipRange = (typeof skipRangeValues)[number]

export type SecondTimestampType = 'remaining' | 'total'

type SongPlayerValue = {
  songUrl: string | null
  isPlaying: boolean
  currentTime: number
  totalTime: number | null
  playbackSpeed: PlaybackSpeed
  volumeLevel: VolumeLevel
  skipRange: SkipRange
  secondTimestampType: SecondTimestampType
  showMoreControls: boolean
}

const initialValue: SongPlayerValue = {
  songUrl: null,
  isPlaying: false,
  currentTime: 0,
  totalTime: null,
  playbackSpeed: 1,
  volumeLevel: 'high',
  skipRange: 5,
  secondTimestampType: 'total',
  showMoreControls: false,
}

export const songPlayerStore = createStore(initialValue, ({ setState }) => ({
  play: () => setState(p => ({ ...p, isPlaying: true })),
  pause: () => setState(p => ({ ...p, isPlaying: false })),
  setCurrentTime: (currentTime: number) =>
    setState(p => ({ ...p, currentTime })),
  setTotalTime: (totalTime: number | null) =>
    setState(p => ({ ...p, totalTime })),
  setSongUrl: (songUrl: string | null) => setState(p => ({ ...p, songUrl })),
  setPlaybackSpeed: (playbackSpeed: PlaybackSpeed) =>
    setState(p => ({ ...p, playbackSpeed })),
  setVolumeLevel: (volumeLevel: VolumeLevel) =>
    setState(p => ({ ...p, volumeLevel })),
  setSkipRange: (skipRange: SkipRange) => setState(p => ({ ...p, skipRange })),
  setSecondTimestampType: (secondTimestampType: SecondTimestampType) =>
    setState(p => ({ ...p, secondTimestampType })),
  changeShowMoreControls: (showMoreControls?: boolean) =>
    setState(p => ({
      ...p,
      showMoreControls:
        typeof showMoreControls === 'boolean'
          ? showMoreControls
          : !p.showMoreControls,
    })),
  reset: () => setState(() => initialValue),
}))
