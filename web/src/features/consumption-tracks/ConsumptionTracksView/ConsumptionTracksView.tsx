import { useQuery } from "@tanstack/react-query"
import { ConsumptionCard } from "../ConsumptionCard"
import {
  ConsumptionStatus,
  listAllTracksEndpointOptions,
} from "#/common/api/client"
import { StateMessage } from "#/common/molecules/StateMessage"
import {
  SpinnerGapIcon,
  WarningCircleIcon,
  QueueIcon,
} from "@phosphor-icons/react"
import { extractErrorMessage } from "#/common/helpers/errors"
import { useIsUnlocked } from "#/features/secret-mode/useSecretModeStore"

export function ConsumptionTracksView() {
  const isUnlocked = useIsUnlocked()
  const tracksQ = useQuery({
    ...listAllTracksEndpointOptions(),
    select: data => {
      let items = [...data.items]

      const visibleStatuses: ConsumptionStatus[] = [
        ConsumptionStatus.IDLE,
        ConsumptionStatus.IN_PROGRESS,
        ConsumptionStatus.ON_HOLD,
      ]

      items = [...items].filter(i => visibleStatuses.includes(i.status))

      if (!isUnlocked) {
        items = [...items].filter(i => !i.isSecret)
      }

      return { items }
    },
  })

  if (tracksQ.status === "pending") {
    return (
      <StateMessage
        mode="LOADING"
        icon={SpinnerGapIcon}
        title="Loading your tracks..."
      />
    )
  }

  if (tracksQ.status === "error") {
    return (
      <StateMessage
        mode="ERROR"
        icon={WarningCircleIcon}
        title="Failed to load tracks"
        description={extractErrorMessage(tracksQ.error)}
        retry={tracksQ.refetch}
      />
    )
  }

  if (tracksQ.data?.items.length === 0) {
    return (
      <StateMessage
        mode="NORMAL"
        icon={QueueIcon}
        title="No tracks yet"
        description="Start adding content to see your progress."
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {tracksQ.data.items.map(track => (
        <ConsumptionCard key={track.id} track={track} />
      ))}
    </div>
  )
}
