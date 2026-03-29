import { MinusIcon, PlusIcon } from "@phosphor-icons/react"
import { useFieldContext } from "."
import { btn } from "../atoms/btn"
import { fieldContainer } from "../atoms/field-container"
import { FieldMeta } from "./field-meta"
import { input } from "../atoms/input"

interface CounterNumberInputProps {
  title: string
}

export function CounterNumberInput({ title }: CounterNumberInputProps) {
  const field = useFieldContext<number>()

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{title}</label>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className={btn({ isIcon: true })}
          onClick={() => field.handleChange(field.state.value - 1)}
        >
          <MinusIcon size={24} />
        </button>

        <input
          type="number"
          className={input({ className: "text-center" })}
          id={field.name}
          name={field.name}
          value={field.state.value || 0}
          onBlur={field.handleBlur}
          onChange={e =>
            field.handleChange(handleNonNumbers(e.target.valueAsNumber))
          }
        />

        <button
          type="button"
          className={btn({ isIcon: true })}
          onClick={() => field.handleChange(field.state.value + 1)}
        >
          <PlusIcon size={24} />
        </button>
      </div>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}

function handleNonNumbers(input: number) {
  return Number.isNaN(input) ? 0 : input
}
