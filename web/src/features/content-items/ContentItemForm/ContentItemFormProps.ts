import type { ContentItemFormValues } from "./ContentItemFormSchema"

type ContentItemFormPropsCreateMode = {
  mode: "CREATE"
}

type ContentItemFormPropsEditMode = {
  mode: "UPDATE"
  initialValues: ContentItemFormValues
}

type ContentItemFormPropsBase = {
  onSubmit: (
    values: ContentItemFormValues,
    resetForm: () => void,
  ) => Promise<void>
}

export type ContentItemFormProps = ContentItemFormPropsBase &
  (ContentItemFormPropsCreateMode | ContentItemFormPropsEditMode)
