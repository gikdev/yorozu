import { contentItemFormatIconMap } from "#/features/content-items/contentItemFormatIconMap"
import type { ContentItemFormatType } from "#/features/content-items/ContentItemFormatType"

interface ConsumptionCardFormatIconProps {
  type: ContentItemFormatType
}

export function ConsumptionCardFormatIcon(p: ConsumptionCardFormatIconProps) {
  const IconComponent = contentItemFormatIconMap[p.type]

  return <IconComponent size={12} />
}
