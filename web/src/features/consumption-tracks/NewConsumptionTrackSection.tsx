import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  createTrackEndpointMutation,
  listTracksForContentItemEndpointQueryKey,
  type ConsumptionTrackResponse,
} from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"
import toast from "react-hot-toast"
import { useNavigate } from "@tanstack/react-router"
import type { ConsumptionTrackFormValues } from "./ConsumptionTrackForm/ConsumptionTrackFormSchema"
import { consumptionTrackMapper } from "./consumptionTrackMapper"
import { ConsumptionTrackForm } from "./ConsumptionTrackForm"

interface NewConsumptionTrackSectionProps {
  contentItemId: string
}

export function NewConsumptionTrackSection(p: NewConsumptionTrackSectionProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const queryKey = listTracksForContentItemEndpointQueryKey({
    path: { id: p.contentItemId },
  })

  const createTrackM = useMutation({
    ...createTrackEndpointMutation(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  })

  const handleSubmit = async (
    values: ConsumptionTrackFormValues,
    _resetForm: () => void,
  ) => {
    const body = consumptionTrackMapper.fromForm.toCreateRequest(values)
    const promise = createTrackM.mutateAsync({
      path: { contentItemId: p.contentItemId },
      body,
    })

    await toast.promise(promise, {
      loading: "Creating track...",
      error: (err: unknown) => extractErrorMessage(err),
      success: (data: ConsumptionTrackResponse) => {
        navigate({
          to: "/apps/hondana/library/$id",
          params: { id: p.contentItemId },
        })
        return `"${data.title}" track created!`
      },
    })
  }

  return <ConsumptionTrackForm mode="CREATE" onSubmit={handleSubmit} />
}
