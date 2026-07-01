import {
  PlayIcon,
  PauseIcon,
  TrashIcon,
  ChartBarIcon,
  HouseIcon,
} from "@phosphor-icons/react"
import type { Session } from "./Session"

interface TimeLogProps {
  isRunning: boolean
  sessions: Session[]
  onToggle: () => void
  onBack: () => void
  onDelete: () => void
}

export function TimeLog(p: TimeLogProps) {
  const BtnIcon = p.isRunning ? PauseIcon : PlayIcon

  const showReport = () => {
    const completed = p.sessions.filter(s => s.endedAt !== null)
    const totalSeconds = completed.reduce(
      (sum, s) =>
        sum + Math.floor(((s.endedAt as number) - s.startedAt) / 1000),
      0,
    )
    const count = completed.length
    const hrs = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    const formatted = [hrs, mins, secs]
      .map(v => String(v).padStart(2, "0"))
      .join(":")
    window.alert(`Total sessions: ${count}\nTotal duration: ${formatted}`)
  }

  return (
    <div className="flex flex-col h-dvh bg-mist-950 text-mist-400">
      <button
        className="flex-1 h-3/4 flex items-center justify-center cursor-pointer hover:bg-sky-950/50"
        onClick={p.onToggle}
      >
        <BtnIcon size={64} weight="fill" className="text-sky-400" />
      </button>

      {/* Lower 1/4 – three action buttons */}
      <div className="h-1/4 flex items-stretch">
        <button
          type="button"
          onClick={p.onBack}
          className="flex-1 flex items-center justify-center gap-2 hover:bg-mist-900 hover:text-mist-100 cursor-pointer transition-colors"
        >
          <HouseIcon size={36} weight="bold" />
        </button>

        <button
          type="button"
          onClick={showReport}
          className="flex-1 flex items-center justify-center gap-2 hover:bg-emerald-950/50 hover:text-emerald-400 cursor-pointer transition-colors"
        >
          <ChartBarIcon size={36} weight="bold" />
        </button>

        <button
          type="button"
          onClick={p.onDelete}
          className="flex-1 flex items-center justify-center gap-2 hover:bg-red-950/50 hover:text-red-400 cursor-pointer transition-colors"
        >
          <TrashIcon size={36} weight="bold" />
        </button>
      </div>
    </div>
  )
}
