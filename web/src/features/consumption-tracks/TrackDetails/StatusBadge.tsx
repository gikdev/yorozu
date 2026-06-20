import { ConsumptionStatus } from "#/common/api/client"
import { tv } from "tailwind-variants"
import {
  PlayIcon,
  PauseIcon,
  CheckIcon,
  XCircleIcon,
  QuestionIcon,
  type Icon,
} from "@phosphor-icons/react"

// ========================
// Status Badge (with icon)
// ========================
const statusConfig: Record<ConsumptionStatus, { icon: Icon; label: string }> = {
  Idle: { icon: QuestionIcon, label: "Idle" },
  InProgress: { icon: PlayIcon, label: "In Progress" },
  Completed: { icon: CheckIcon, label: "Completed" },
  OnHold: { icon: PauseIcon, label: "On Hold" },
  Dropped: { icon: XCircleIcon, label: "Dropped" },
}

const styleStatusBadge = tv({
  base: "flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg",
  variants: {
    status: {
      Idle: "bg-gray-600",
      InProgress: "bg-blue-600",
      Completed: "bg-green-600",
      OnHold: "bg-yellow-600",
      Dropped: "bg-red-600",
    },
  },
})

export function StatusBadge({ status }: { status: ConsumptionStatus }) {
  const config = statusConfig[status]
  const Icon = config.icon
  return (
    <div className={styleStatusBadge({ status })}>
      <Icon size={18} weight="fill" />
      {config.label}
    </div>
  )
}
