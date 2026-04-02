import { toPersianDateEn } from "#/common/helpers/date"
import { ClockIcon } from "@phosphor-icons/react"

interface WaitingForCardProps {
  description: string
  reviewAt: string
}

export function WaitingForCard(p: WaitingForCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="flex gap-1 items-center">
        <ClockIcon size={16} />
        <span>Review At</span>
      </p>

      <p className="text-2xl font-bold text-mist-100">
        {toPersianDateEn(p.reviewAt)}
      </p>

      <p className="flex gap-1 items-center">
        <span>For:</span>
      </p>

      <p className="text-mist-100 font-bold">{p.description}</p>
    </div>
  )
}
