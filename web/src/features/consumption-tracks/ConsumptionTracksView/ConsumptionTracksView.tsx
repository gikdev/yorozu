import { useMutation, useQuery } from "@tanstack/react-query"
import { ConsumptionCard } from "../ConsumptionCard"
import { listAllTracksEndpointOptions, ProgressAction, updateTrackProgressEndpointMutation, type ConsumptionStatus } from "#/common/api/client"
import { StateMessage } from "#/common/molecules/StateMessage"
import {
  SpinnerGapIcon,
  WarningCircleIcon,
  QueueIcon,
} from "@phosphor-icons/react"
import { extractErrorMessage } from "#/common/helpers/errors"
import toast from "react-hot-toast"

export function ConsumptionTracksView() {
  const tracksQ = useQuery(listAllTracksEndpointOptions())
  const progressM = useMutation(updateTrackProgressEndpointMutation())

  const increaseUnit = (id: string, status: ConsumptionStatus) => {
    const path = { id }
    const body = { action: ProgressAction.INCREMENT, amount: 1 }
    const onError = (err: unknown) => toast.error(extractErrorMessage(err))

    progressM.mutate({ path, body }, { onError })
  }

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
      {tracksQ.data.items.map(i => (
        <ConsumptionCard
          key={i.id}
          imageSrc={i.contentItemCoverImageUrl}
          imageFallbackLetter={i.contentItemPlaceholderLetter?.charAt(0) || "?"}
          title={i.title}
          subtitle={i.contentItemTitle}
          formatType={i.contentItemFormat}
          current={i.currentUnit}
          total={i.totalUnits}
          isAddLoading={progressM.isPending}
          onAdd={() => increaseUnit(i.id, i.status)}
        />
      ))}
    </div>
  )
}
