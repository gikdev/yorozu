import type { ContentItemFormat } from "#/common/api/client"
import { LockSimpleIcon } from "@phosphor-icons/react"
import { ConsumptionCardFormatIcon } from "./ConsumptionCardFormatIcon"

interface ConsumptionCardTitleProps {
  title: string
  subtitle: string
  formatType: ContentItemFormat
  isSecret: boolean
}

export function ConsumptionCardTitle(p: ConsumptionCardTitleProps) {
  const textColor = p.isSecret ? "text-violet-400" : "text-mist-100"

  return (
    <div className="flex flex-col gap-1">
      <p className={`flex items-center ${textColor}`}>
        <span className="font-bold">{p.title}</span>

        {p.isSecret && <LockSimpleIcon weight="fill" className="ms-auto" />}
      </p>
      <p className="text-xs flex gap-1 items-center">
        <ConsumptionCardFormatIcon type={p.formatType} />
        <span>{p.subtitle}</span>
      </p>
    </div>
  )
}
