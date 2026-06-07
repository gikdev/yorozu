import { CircleIcon } from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

export type FormatType = "readable" | "watchable" | "listenable" | "mixed"

const formatIconMap: Record<FormatType, Icon> = {
  mixed: CircleIcon,
  listenable: CircleIcon,
  watchable: CircleIcon,
  readable: CircleIcon,
}

interface ConsumptionCardFormatIconProps {
  type: FormatType
}

export function ConsumptionCardFormatIcon(p: ConsumptionCardFormatIconProps) {
  const IconComponent = formatIconMap[p.type]

  return <IconComponent size={12} />
}
