import {
  CircleNotchIcon,
  PlayIcon,
  PlusIcon,
  CheckCircleIcon,
  SquareIcon,
} from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { ConsumptionCardImage } from "./ConsumptionCardImage"
import { ConsumptionCardTitle } from "./ConsumptionCardTitle"
import { styleConsumptionCardBtn } from "./styleConsumptionCardBtn"
import {
  startTrackEndpointMutation,
  updateTrackProgressEndpointMutation,
  listAllTracksEndpointQueryKey, // adjust if needed
  type ConsumptionTrackResponse,
} from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"
import { TrackProgress } from "#/common/molecules/TrackProgress"
import { Link } from "@tanstack/react-router"

const queryKey = listAllTracksEndpointQueryKey()
const onError = (err: unknown) => toast.error(extractErrorMessage(err))

interface ConsumptionCardProps {
  track: ConsumptionTrackResponse
}

export function ConsumptionCard(p: ConsumptionCardProps) {
  const queryClient = useQueryClient()
  const {
    id,
    canStart,
    isSecret,
    canProgress,
    status,
    contentItemCoverImageUrl,
    contentItemFormat,
    contentItemTitle,
    contentItemId,
    unitType,
    currentUnit,
    title,
    totalUnits,
  } = p.track

  const progressM = useMutation({
    ...updateTrackProgressEndpointMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError,
  })

  const startM = useMutation({
    ...startTrackEndpointMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    onError,
  })

  const isLoading = progressM.isPending || startM.isPending
  const isCompleted = status === "Completed"
  const isDropped = status === "Dropped"

  const handleClick = () => {
    if (isLoading) return

    if (canStart) {
      startM.mutate({ path: { id } })

      return
    }

    if (canProgress) {
      progressM.mutate({
        path: { id },
        body: { amount: 1, action: "Increment" },
      })

      return
    }
  }

  return (
    <div className="flex gap-2 rounded-lg bg-mist-900 border border-mist-800 overflow-hidden">
      <Link
        to="/apps/hondana/library/$id"
        params={{ id: contentItemId }}
        className="contents"
      >
        <ConsumptionCardImage
          src={contentItemCoverImageUrl}
          fallbackLetter={contentItemTitle?.charAt(0) ?? "?"}
          alt={title}
        />
      </Link>

      <Link
        to="/apps/hondana/tracks/$id"
        params={{ id }}
        className="flex-1 flex flex-col justify-between py-2"
      >
        <ConsumptionCardTitle
          title={title}
          subtitle={contentItemTitle}
          formatType={contentItemFormat}
          isSecret={isSecret}
        />

        <TrackProgress
          current={currentUnit}
          total={totalUnits}
          unit={unitType || "Unit"}
          units={unitType || "units"}
        />
      </Link>

      <button
        className={styleConsumptionCardBtn()}
        onClick={handleClick}
        disabled={isLoading || isCompleted || isDropped}
      >
        {isLoading && <CircleNotchIcon size={24} className="animate-spin" />}
        {canStart && <PlayIcon size={24} />}
        {isDropped && <SquareIcon size={24} />}
        {canProgress && <PlusIcon size={24} />}
        {isCompleted && (
          <CheckCircleIcon
            size={24}
            weight="fill"
            className="text-emerald-400"
          />
        )}
      </button>
    </div>
  )
}
