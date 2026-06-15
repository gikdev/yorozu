import { useMutation } from "@tanstack/react-query"
import { ContentItemForm } from "../ContentItemForm"
import {
  createContentItemMutation,
  type ContentItemResponse,
} from "#/common/api/client"
import type { ContentItemFormValues } from "../ContentItemForm/ContentItemFormSchema"
import { contentItemMapper } from "../contentItemMapper"
import { extractErrorMessage } from "#/common/helpers/errors"
import toast from "react-hot-toast"

export function NewContentItemSection() {
  const createContentMenuMutation = useMutation(createContentItemMutation())

  const handleSubmit = async (
    values: ContentItemFormValues,
    resetForm: () => void,
  ) => {
    const body = contentItemMapper.fromForm.toCreateRequest(values)
    const promise = createContentMenuMutation.mutateAsync({ body })
    const loading = "Creating..."
    const error = (err: unknown) => extractErrorMessage(err)
    const success = (data: ContentItemResponse) => {
      resetForm()
      return `${data.title} was successfully created!`
    }

    await toast.promise(promise, {
      loading,
      error,
      success,
    })
  }

  return <ContentItemForm mode="CREATE" onSubmit={handleSubmit} />
}
