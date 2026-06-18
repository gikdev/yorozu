import type {
  ConsumptionTrackResponse,
  CreateTrackRequest,
  UpdateTrackRequest,
} from "#/common/api/client"
import type { ConsumptionTrackFormValues } from "./ConsumptionTrackForm/ConsumptionTrackFormSchema"

export const consumptionTrackMapper = {
  fromResponse: {
    toForm: (data: ConsumptionTrackResponse): ConsumptionTrackFormValues => ({
      title: data.title,
      description: data.description ?? "",
      type: data.type,
    }),
  },
  fromForm: {
    toCreateRequest: (
      data: ConsumptionTrackFormValues,
    ): CreateTrackRequest => ({
      title: data.title,
      description: data.description || null,
      type: data.type,
    }),
    toUpdateRequest: (
      data: ConsumptionTrackFormValues,
    ): UpdateTrackRequest => ({
      title: data.title,
      description: data.description || null,
      type: data.type,
    }),
  },
}
