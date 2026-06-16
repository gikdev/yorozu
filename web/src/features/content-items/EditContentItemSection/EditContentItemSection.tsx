import { useMutation, useQuery } from "@tanstack/react-query"
import { ContentItemForm } from "../ContentItemForm"
import {
  getContentItemOptions,
  updateContentItemMutation,
  type ContentItemResponse,
} from "#/common/api/client"
import type { ContentItemFormValues } from "../ContentItemForm/ContentItemFormSchema"
import { contentItemMapper } from "../contentItemMapper"
import { extractErrorMessage } from "#/common/helpers/errors"
import toast from "react-hot-toast"
import { StateMessage } from "#/common/molecules/StateMessage"
import { SpinnerGapIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { useNavigate } from "@tanstack/react-router"

interface EditContentItemSectionProps {
  contentItemId: string
}

export function EditContentItemSection(p: EditContentItemSectionProps) {
  const navigate = useNavigate()
  const updateContentMenuM = useMutation(updateContentItemMutation())
  const getContentItemQ = useQuery({
    ...getContentItemOptions({ path: { id: p.contentItemId } }),
    select: contentItemMapper.fromResponse.toForm,
  })

  const handleSubmit = async (
    values: ContentItemFormValues,
    _resetForm: () => void,
  ) => {
    const path = { id: p.contentItemId }
    const body = contentItemMapper.fromForm.toUpdateRequest(values)
    const promise = updateContentMenuM.mutateAsync({ path, body })
    const loading = "Updating..."
    const error = (err: unknown) => extractErrorMessage(err)
    const success = (data: ContentItemResponse) => {
      navigate({
        to: "/apps/hondana/library/$id",
        params: { id: p.contentItemId },
      })
      return `${data.title} was successfully updated!`
    }

    await toast.promise(promise, {
      loading,
      error,
      success,
    })
  }

  if (getContentItemQ.status === "pending") {
    return (
      <StateMessage mode="LOADING" icon={SpinnerGapIcon} title="Loading..." />
    )
  }

  if (getContentItemQ.status === "error") {
    return (
      <StateMessage
        icon={WarningCircleIcon}
        mode="ERROR"
        title="Failed to load content"
        description={extractErrorMessage(getContentItemQ.error)}
        retry={getContentItemQ.refetch}
      />
    )
  }

  return (
    <ContentItemForm
      mode="UPDATE"
      initialValues={getContentItemQ.data}
      onSubmit={handleSubmit}
    />
  )
}
