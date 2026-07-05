import { CaretDownIcon } from "@phosphor-icons/react"
import { useState } from "react"
import { tv } from "tailwind-variants"
import { btn } from "../atoms/btn"
import { fieldContainer } from "../atoms/field-container"
import { useFieldContext } from "."
import { FieldMeta } from "./field-meta"

export type TagOption = {
  title: string
  value: string
}

interface TagsPickerInputProps {
  title: string
  options: Array<TagOption>
}

const styleCaret = tv({
  base: "transition-transform duration-200",
  variants: {
    open: {
      true: "rotate-180",
    },
  },
})

export function TagsPickerInput({ title, options }: TagsPickerInputProps) {
  const field = useFieldContext<string[]>()
  const [open, setOpen] = useState(false)

  const selected = field.state.value ?? []
  const count = selected.length

  const toggleOption = (value: string) => {
    const next = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value]

    field.handleChange(next)
    field.handleBlur()
  }

  return (
    <div className={fieldContainer()}>
      <button
        type="button"
        className={btn({ className: "" })}
        onClick={() => setOpen(!open)}
      >
        <span className="me-auto">{title}</span>

        <span className="text-xs">
          ({count}/{options.length})
        </span>

        <CaretDownIcon size={20} className={styleCaret({ open })} />
      </button>

      {open && (
        <div className="flex flex-wrap gap-2 mt-2">
          {options.map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              onBlur={field.handleBlur}
              className={btn({
                theme: selected.includes(option.value) ? "primary" : "glass",
              })}
            >
              {option.title}
            </button>
          ))}
        </div>
      )}

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
