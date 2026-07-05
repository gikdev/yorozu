import type { Icon } from "@phosphor-icons/react"
import { fieldContainer } from "../atoms/field-container"
import { useFieldContext } from "."
import { FieldMeta } from "./field-meta"

interface SvgToggleInputProps {
  title: string
  Icon: Icon
  iconSelectedClass: string
}

export function SvgToggleInput(p: SvgToggleInputProps) {
  const field = useFieldContext<boolean>()

  const isSelected = field.state.value

  return (
    <div className={fieldContainer()}>
      <label className="flex flex-col items-center gap-2 cursor-pointer hover:bg-white/10 py-2">
        <button
          type="button"
          id={field.name}
          name={field.name}
          onBlur={field.handleBlur}
          onClick={() => field.handleChange(!isSelected)}
        >
          <p.Icon
            size={40}
            weight={isSelected ? "fill" : "regular"}
            className={isSelected ? p.iconSelectedClass : undefined}
          />
        </button>

        <span className="text-xs">{p.title}</span>
      </label>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
