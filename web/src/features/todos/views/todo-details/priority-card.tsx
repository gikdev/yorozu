import type { TodoPriority } from "#/common/api/client"
import { FlagIcon } from "@phosphor-icons/react"

interface PriorityCardProps {
  priority: TodoPriority
}

export function PriorityCard(p: PriorityCardProps) {
  if (p.priority === "Unknown") return null

  let letter = "-"
  let hint = "(N/A)"

  switch (p.priority) {
    case "A_MustDo":
      letter = "A"
      hint = "Must Do"
      break
    case "B_ShouldDo":
      letter = "B"
      hint = "Should Do"
      break
    case "C_NiceToDo":
      letter = "C"
      hint = "Nice to Do"
      break
    case "D_Delegate":
      letter = "D"
      hint = "Delegate"
      break
    case "E_Eliminate":
      letter = "E"
      hint = "Eliminate"
      break
  }

  return (
    <div
      className="flex flex-col items-center text-center"
      title={`Priority: ${letter} - ${hint}`}
    >
      <p className="text-5xl font-bold text-mist-100">{letter}</p>
      <p className="flex gap-1 items-center">
        <FlagIcon size={16} />
        <span>{hint}</span>
      </p>
    </div>
  )
}
