import { EnergyLevel } from "#/common/api/client"
import { LightningIcon } from "@phosphor-icons/react"

interface EnergyLevelCardProps {
  energyLevel: EnergyLevel
}

export function EnergyLevelCard({ energyLevel }: EnergyLevelCardProps) {
  const is1stOn =
    energyLevel === EnergyLevel.LOW ||
    energyLevel === EnergyLevel.MEDIUM ||
    energyLevel === EnergyLevel.HIGH
  const is2ndOn =
    energyLevel === EnergyLevel.MEDIUM || energyLevel === EnergyLevel.HIGH
  const is3rdOn = energyLevel === EnergyLevel.HIGH

  return (
    <div className="flex flex-col gap-2 items-center text-center">
      <div className="flex items-center">
        <LightningIcon size={40} weight={is1stOn ? "fill" : "regular"} />
        <LightningIcon size={40} weight={is2ndOn ? "fill" : "regular"} />
        <LightningIcon size={40} weight={is3rdOn ? "fill" : "regular"} />
      </div>

      <p className="flex gap-1 items-center">
        <LightningIcon size={16} />
        <span>Energy Level</span>
      </p>
    </div>
  )
}
