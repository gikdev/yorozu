import { TimerIcon } from "@phosphor-icons/react"

interface PomodoroCardProps {
  pomodoros: number
}

export function PomodoroCard(p: PomodoroCardProps) {
  return (
    <div
      className="flex flex-col items-center"
      title={`Estimated Pomodoros: ${p.pomodoros}`}
    >
      <p className="text-5xl font-bold text-mist-100">{p.pomodoros}</p>
      <p className="flex gap-1 items-center">
        <TimerIcon size={16} />
        <span>Est. Pomos</span>
      </p>
    </div>
  )
}
