import { useSelector } from '@tanstack/react-store'
import { songPlayerStore } from './store'
import { TimestampCard } from './TimestampCard'

export function TimestampCards() {
  const currentTime = useSelector(songPlayerStore, s => s.currentTime)
  const totalTime = useSelector(songPlayerStore, s => s.totalTime)

  const remainingTime = totalTime == null ? null : totalTime - currentTime

  return (
    <div className='flex items-center justify-between gap-2 *:flex-1'>
      <TimestampCard label='Total Time' timestamp={totalTime} />
      <TimestampCard label='Current Time' timestamp={currentTime} />
      <TimestampCard label='Remaining Time' timestamp={remainingTime} />
    </div>
  )
}
