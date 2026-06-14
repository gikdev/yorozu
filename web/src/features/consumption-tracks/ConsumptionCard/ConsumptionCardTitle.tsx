import type { ContentItemFormat } from "#/common/api/client"
import { ConsumptionCardFormatIcon } from "./ConsumptionCardFormatIcon"

interface ConsumptionCardTitleProps {
  title: string
  subtitle: string
  formatType: ContentItemFormat
}

export function ConsumptionCardTitle(p: ConsumptionCardTitleProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-bold text-mist-100">{p.title}</p>
      <p className="text-xs flex gap-1 items-center">
        <ConsumptionCardFormatIcon type={p.formatType} />
        <span>{p.subtitle}</span>
      </p>
    </div>
  )
}
