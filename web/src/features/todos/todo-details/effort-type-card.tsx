import { TodoEffortType } from "#/common/api/client"
import { TargetIcon } from "@phosphor-icons/react"

interface EffortTypeCardProps {
  effortType: TodoEffortType
}

export function EffortTypeCard(p: EffortTypeCardProps) {
  const src =
    p.effortType === TodoEffortType.CAKE
      ? "/cake.jpg"
      : p.effortType === TodoEffortType.FROG
        ? "/frog.png"
        : null

  if (src == null) return null

  return (
    <div className="flex flex-col gap-2 items-center text-center">
      <img src={src} className="object-cover rounded-md size-16" />

      <p className="flex gap-1 items-center">
        <TargetIcon size={16} />
        <span>Effort Type</span>
      </p>
    </div>
  )
}
