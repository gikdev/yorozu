import { useSongPlayerStore } from '../useSongPlayerStore'
import { TimestampCard } from './TimestampCard'

export function TimestampCards() {
  const currentTime = useSongPlayerStore(s => s.currentTime)
  const totalTime = useSongPlayerStore(s => s.totalTime)

  const remainingTime = totalTime == null ? null : totalTime - currentTime

  return (
    <div className='flex items-center justify-between gap-2 *:flex-1'>
      <TimestampCard label='Current Time' timestamp={currentTime} />
      <TimestampCard label='Remaining Time' timestamp={remainingTime} />
      <TimestampCard label='Total Time' timestamp={totalTime} />
    </div>
  )
}
