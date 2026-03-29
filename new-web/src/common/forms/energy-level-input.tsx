import { LightningIcon } from "@phosphor-icons/react"
import { useFieldContext } from "."
import { fieldContainer } from "../atoms/field-container"
import { FieldMeta } from "./field-meta"
import { EnergyLevel } from "#/common/api/client"

interface EnergyLevelInputProps {
  title: string
}

export function EnergyLevelInput({ title }: EnergyLevelInputProps) {
  const field = useFieldContext<EnergyLevel>()

  const isValueLow = field.state.value === EnergyLevel.LOW
  const isValueMedium = field.state.value === EnergyLevel.MEDIUM
  const isValueHigh = field.state.value === EnergyLevel.HIGH

  const isLowSelected = isValueLow || isValueMedium || isValueHigh
  const isMediumSelected = isValueMedium || isValueHigh
  const isHighSelected = isValueHigh

  const handleLowClick = () =>
    field.handleChange(isValueLow ? EnergyLevel.UNKNOWN : EnergyLevel.LOW)
  const handleMediumClick = () => field.handleChange(EnergyLevel.MEDIUM)
  const handleHighClick = () => field.handleChange(EnergyLevel.HIGH)

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{title}</label>

      <div className="flex gap-1 items-center justify-between">
        <EnergyLevelBtn
          title="Low"
          onClick={handleLowClick}
          isSelected={isLowSelected}
        />
        <EnergyLevelBtn
          title="Medium"
          onClick={handleMediumClick}
          isSelected={isMediumSelected}
        />
        <EnergyLevelBtn
          title="High"
          onClick={handleHighClick}
          isSelected={isHighSelected}
        />
      </div>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}

interface EnergyLevelBtnProps {
  title: string
  onClick: () => void
  isSelected: boolean
}

const EnergyLevelBtn = ({
  isSelected,
  onClick,
  title,
}: EnergyLevelBtnProps) => (
  <button
    type="button"
    className="cursor-pointer flex flex-col gap-2 items-center flex-1 hover:bg-white/10 p-2 rounded-md"
    onClick={onClick}
  >
    <LightningIcon
      size={40}
      color={isSelected ? "gold" : undefined}
      weight={isSelected ? "fill" : "regular"}
    />
    <span className="text-xs">{title}</span>
  </button>
)
