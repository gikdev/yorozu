import type { ConsumptionTrackResponse } from "#/common/api/client"

export function ProgressSection({
  track,
}: {
  track: ConsumptionTrackResponse
}) {
  const hasTotal = track.totalUnits != null

  return (
    <div className="bg-mist-900 rounded-xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="">{track.unitType ?? "Progress"}</span>

        <span className="text-xs">
          {track.canProgress ? "Incrementable" : "Locked"}
        </span>
      </div>

      <div className="flex items-baseline gap-2 justify-center">
        <span className="text-4xl font-extrabold text-white tabular-nums">
          {track.currentUnit}
        </span>

        <span className="text-2xl">/</span>

        <span className="text-2xl font-semibold text-mist-300 tabular-nums">
          {track.totalUnits ?? "??"}
        </span>
      </div>

      {hasTotal && (
        <div className="h-2 bg-mist-900 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-sky-500 to-emerald-400 transition-all duration-500 ease-out"
            style={{
              width: `${Math.min((track.currentUnit / (track.totalUnits ?? 0)) * 100, 100)}%`,
            }}
          />
        </div>
      )}
    </div>
  )
}
