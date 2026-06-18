import { useQuery } from "@tanstack/react-query"
import { getContentItemOptions } from "#/common/api/client"
import { SpinnerGapIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { StateMessage } from "#/common/molecules/StateMessage"
import { extractErrorMessage } from "#/common/helpers/errors"
import { ContentItemDetails } from "../ContentItemDetails"

interface ContentItemDetailsSectionProps {
  contentItemId: string
}

export function ContentItemDetailsSection(p: ContentItemDetailsSectionProps) {
  const { data, status, error, refetch } = useQuery(
    getContentItemOptions({ path: { id: p.contentItemId } }),
  )

  if (status === "pending")
    return (
      <StateMessage mode="LOADING" icon={SpinnerGapIcon} title="Loading..." />
    )

  if (status === "error")
    return (
      <StateMessage
        icon={WarningCircleIcon}
        mode="ERROR"
        title="Failed to load content"
        description={extractErrorMessage(error)}
        retry={refetch}
      />
    )

  return <ContentItemDetails item={data} />
}
