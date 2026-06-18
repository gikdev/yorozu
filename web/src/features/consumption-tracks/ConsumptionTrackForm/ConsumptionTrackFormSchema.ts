import { z } from "zod"
import { zIntentionType } from "#/common/api/client"

export const ConsumptionTrackFormSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  type: zIntentionType,
})

export type ConsumptionTrackFormValues = z.infer<
  typeof ConsumptionTrackFormSchema
>

export const consumptionTrackFormEmptyValues: ConsumptionTrackFormValues = {
  title: "",
  description: "",
  type: "Unknown",
}
