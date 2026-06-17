import { useQuery } from "@tanstack/react-query"
import { ConsumptionCard } from "../ConsumptionCard"
import { listAllTracksEndpointOptions } from "#/common/api/client"
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
    select: isUnlocked
      ? undefined
      : data => ({ items: data.items.filter(i => !i.isSecret) }),
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
