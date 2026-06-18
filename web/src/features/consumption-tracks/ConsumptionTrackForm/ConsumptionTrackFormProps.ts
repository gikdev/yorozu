import type { ConsumptionTrackFormValues } from "./ConsumptionTrackFormSchema"

type ConsumptionTrackFormPropsCreateMode = {
  mode: "CREATE"
}

type ConsumptionTrackFormPropsEditMode = {
  mode: "UPDATE"
  initialValues: ConsumptionTrackFormValues
}

type ConsumptionTrackFormPropsBase = {
  onSubmit: (
    values: ConsumptionTrackFormValues,
    resetForm: () => void,
  ) => Promise<void>
}

export type ConsumptionTrackFormProps = ConsumptionTrackFormPropsBase &
  (ConsumptionTrackFormPropsCreateMode | ConsumptionTrackFormPropsEditMode)
