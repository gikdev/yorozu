import type { ContentItemFormat } from "#/common/api/client"
import { contentItemFormatIconMap } from "#/features/content-items/contentItemFormatIconMap"

interface ConsumptionCardFormatIconProps {
  type: ContentItemFormat
}

export function ConsumptionCardFormatIcon(p: ConsumptionCardFormatIconProps) {
  const IconComponent = contentItemFormatIconMap[p.type]

  return <IconComponent size={12} />
}
