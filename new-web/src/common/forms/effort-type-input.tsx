import { useFieldContext } from "."
import { fieldContainer } from "../atoms/field-container"
import { FieldMeta } from "./field-meta"
import { TodoEffortType } from "#/common/api/client"

interface EffortTypeInputProps {
  title: string
}

export function EffortTypeInput(p: EffortTypeInputProps) {
  const field = useFieldContext<TodoEffortType>()

  const isCakeSelected = field.state.value === TodoEffortType.CAKE
  const handleCakeClick = () =>
    field.handleChange(
      isCakeSelected ? TodoEffortType.UNKNOWN : TodoEffortType.CAKE,
    )

  const isFrogSelected = field.state.value === TodoEffortType.FROG
  const handleFrogClick = () =>
    field.handleChange(
      isFrogSelected ? TodoEffortType.UNKNOWN : TodoEffortType.FROG,
    )

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{p.title}</label>

      <div className="flex gap-1 items-center justify-between">
        <EffortTypeBtn
          imgPath="/cake.jpg"
          onClick={handleCakeClick}
          isSelected={isCakeSelected}
          helpText="Cake: easy/enjoyable todo"
        />
        <EffortTypeBtn
          imgPath="/frog.png"
          onClick={handleFrogClick}
          isSelected={isFrogSelected}
          helpText="Frog: hard/disgusting todo"
        />
      </div>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}

interface EffortTypeBtn {
  imgPath: string
  onClick: () => void
  isSelected: boolean
  helpText: string
}

const EffortTypeBtn = (p: EffortTypeBtn) => (
  <button
    type="button"
    onClick={p.onClick}
    title={p.helpText}
    className="
      cursor-pointer flex items-center justify-center
      flex-1 hover:bg-white/10 p-2 rounded-md min-h-20
    "
  >
    <img
      src={p.imgPath}
      alt={p.helpText}
      data-selected={p.isSelected}
      className="
        object-cover rounded-md
        size-12 data-[selected=true]:size-16
        grayscale-100 data-[selected=true]:grayscale-0
      "
    />
  </button>
)
