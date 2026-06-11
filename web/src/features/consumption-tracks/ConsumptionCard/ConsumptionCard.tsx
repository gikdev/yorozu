import { PlusIcon } from "@phosphor-icons/react"
import { ConsumptionCardImage } from "./ConsumptionCardImage"
import { ConsumptionCardTitle } from "./ConsumptionCardTitle"
import { ConsumptionCardProgress } from "./ConsumptionCardProgress"
import { styleConsumptionCardBtn } from "./styleConsumptionCardBtn"
import type { ContentItemFormat } from "#/common/api/client"

interface ConsumptionCardProps {
  imageSrc?: string | null
  imageFallbackLetter: string
  title: string
  subtitle: string
  formatType: ContentItemFormat
  current: number
  total: number | null
  onAdd?: () => void
}

export function ConsumptionCard(p: ConsumptionCardProps) {
  return (
    <div className="flex gap-2 rounded-lg bg-mist-900 border border-mist-800 overflow-hidden">
      <ConsumptionCardImage
        src={p.imageSrc}
        fallbackLetter={p.imageFallbackLetter}
        alt={p.title}
      />

      <div className="flex-1 flex flex-col justify-between py-2">
        <ConsumptionCardTitle
          title={p.title}
          subtitle={p.subtitle}
          formatType={p.formatType}
        />

        <ConsumptionCardProgress current={p.current} total={p.total} />
      </div>

      <button className={styleConsumptionCardBtn()} onClick={p.onAdd}>
        <PlusIcon size={24} />
      </button>
    </div>
  )
}
