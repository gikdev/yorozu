import {
  ConsumptionStatus,
  type ConsumptionTrackResponse,
} from "#/common/api/client"
import {
  PlayIcon,
  PauseIcon,
  CheckIcon,
  XCircleIcon,
  QuestionIcon,
  type Icon,
} from "@phosphor-icons/react"

const statusConfig: Record<
  ConsumptionStatus,
  { icon: Icon; label: string; color: string }
> = {
  Idle: { icon: QuestionIcon, label: "Idle", color: "text-gray-400" },
  InProgress: { icon: PlayIcon, label: "In Progress", color: "text-blue-400" },
  Completed: { icon: CheckIcon, label: "Completed", color: "text-green-400" },
  OnHold: { icon: PauseIcon, label: "On Hold", color: "text-yellow-400" },
  Dropped: { icon: XCircleIcon, label: "Dropped", color: "text-red-400" },
}

export function TrackStatusCard({
  track,
}: {
  track: ConsumptionTrackResponse
}) {
  const config = statusConfig[track.status]
  const StatusIcon = config.icon
  const hasTotal = track.totalUnits != null

  return (
    <div className="bg-mist-900 rounded-lg p-5 gap-4 flex flex-col shadow-lg">
      {/* Status row */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-mist-100 uppercase tracking-wide">
          {track.unitType ?? "Progress"}
        </span>
        <div className={`flex items-center gap-1.5 ${config.color}`}>
          <StatusIcon size={18} weight="fill" />
          <span className="text-sm font-bold">{config.label}</span>
        </div>
      </div>

      {/* Progress numbers */}
      <div className="flex items-baseline gap-2 justify-center text-2xl">
        <span className="text-4xl font-bold text-white tabular-nums">
          {track.currentUnit}
        </span>

        <span className="">/</span>

        <span className="tabular-nums">{track.totalUnits ?? "??"}</span>
      </div>

      {/* Progress bar */}
      {hasTotal && (
        <div className="h-2 bg-mist-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-sky-500 to-emerald-400 transition-all duration-500 ease-out rounded-full"
            style={{
              width: `${Math.min(
                (track.currentUnit / (track.totalUnits ?? 1)) * 100,
                100,
              )}%`,
            }}
          />
        </div>
      )}
    </div>
  )
}
