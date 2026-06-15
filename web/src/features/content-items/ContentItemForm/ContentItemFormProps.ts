import type { ContentItemFormValues } from "./ContentItemFormSchema"

type ContentItemFormPropsEditMode = {
  mode: "UPDATE"
}

type ContentItemFormPropsCreateMode = {
  mode: "CREATE"
}

type ContentItemFormPropsBase = {
  onSubmit: (values: ContentItemFormValues) => void
}

export type ContentItemFormProps = ContentItemFormPropsBase &
  (ContentItemFormPropsCreateMode | ContentItemFormPropsEditMode)
