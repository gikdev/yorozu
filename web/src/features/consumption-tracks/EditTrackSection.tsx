import { useMutation, useQuery } from "@tanstack/react-query"
import {
  getTrackEndpointOptions,
  updateTrackEndpointMutation,
  type ConsumptionTrackResponse,
} from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"
import toast from "react-hot-toast"
import { StateMessage } from "#/common/molecules/StateMessage"
import { SpinnerGapIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { useNavigate } from "@tanstack/react-router"
import type { ConsumptionTrackFormValues } from "./ConsumptionTrackForm/ConsumptionTrackFormSchema"
import { consumptionTrackMapper } from "./consumptionTrackMapper"
import { ConsumptionTrackForm } from "./ConsumptionTrackForm"

interface EditTrackSectionProps {
  trackId: string
}

export function EditTrackSection({ trackId }: EditTrackSectionProps) {
  const navigate = useNavigate()
  const updateMutation = useMutation(updateTrackEndpointMutation())

  const trackQuery = useQuery({
    ...getTrackEndpointOptions({ path: { id: trackId } }),
    select: data => consumptionTrackMapper.fromResponse.toForm(data),
  })

  const handleSubmit = async (values: ConsumptionTrackFormValues) => {
    const path = { id: trackId }
    const body = consumptionTrackMapper.fromForm.toUpdateRequest(values)
    const promise = updateMutation.mutateAsync({ path, body })
    await toast.promise(promise, {
      loading: "Updating...",
      error: (err: unknown) => extractErrorMessage(err),
      success: (data: ConsumptionTrackResponse) => {
        navigate({
          to: "/apps/hondana/tracks/$id",
          params: { id: trackId },
        })

        return `${data.title ?? "Track"} updated!`
      },
    })
  }

  if (trackQuery.status === "pending") {
    return (
      <StateMessage
        mode="LOADING"
        icon={SpinnerGapIcon}
        title="Loading track..."
      />
    )
  }

  if (trackQuery.status === "error") {
    return (
      <StateMessage
        icon={WarningCircleIcon}
        mode="ERROR"
        title="Failed to load track"
        description={extractErrorMessage(trackQuery.error)}
        retry={trackQuery.refetch}
      />
    )
  }

  return (
    <ConsumptionTrackForm
      mode="UPDATE"
      initialValues={trackQuery.data}
      onSubmit={handleSubmit}
    />
  )
}
