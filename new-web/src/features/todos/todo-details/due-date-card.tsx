import { toPersianDateEn } from "#/common/helpers/date"
import { CalendarIcon } from "@phosphor-icons/react"

interface DueDateCardProps {
  dueDate: string
}

export function DueDateCard(p: DueDateCardProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold text-mist-100">
        {toPersianDateEn(p.dueDate)}
      </p>

      <p className="flex gap-1 items-center">
        <CalendarIcon size={16} />
        <span>Due Date</span>
      </p>
    </div>
  )
}
