import type {
  ConsumptionTrackListMiniResponse,
  CreateConsumptionTrackListRequest,
  UpdateConsumptionTrackListRequest,
} from "#/common/api/client"
import type { ConsumptionTrackListFormValues } from "./ConsumptionTrackListForm"

export const consumptionTrackListMapper = {
  fromFormValues: {
    toCreateRequest: (
      input: ConsumptionTrackListFormValues,
    ): CreateConsumptionTrackListRequest => ({
      title: input.title.trim(),
      description: input.description.trim() || null,
    }),
    toUpdateRequest: (
      input: ConsumptionTrackListFormValues,
    ): UpdateConsumptionTrackListRequest => ({
      title: input.title.trim(),
      description: input.description.trim() || null,
    }),
  },

  fromResponse: {
    toFormValues: (
      input: ConsumptionTrackListMiniResponse,
    ): ConsumptionTrackListFormValues => ({
      description: input.description || "",
      title: input.title,
    }),
  },
}
