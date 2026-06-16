import type { ChangeEvent } from "react"
import { useFieldContext } from "."
import { fieldContainer } from "../atoms/field-container"
import { FieldMeta } from "./field-meta"
import { styleInput } from "../atoms/input"

interface SimpleWordListInputProps {
  title: string
}

export function SimpleWordListInput(p: SimpleWordListInputProps) {
  const field = useFieldContext<string[]>()

  const value = field.state.value.join(",")

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) => {
    const raw = e.target.value
    const tokens = raw.split(",")
    field.handleChange(tokens)
  }

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{p.title}</label>

      <textarea
        id={field.name}
        name={field.name}
        value={value}
        onBlur={field.handleBlur}
        onChange={handleChange}
        className={styleInput({ isMultiline: true })}
      />

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
