import { useFieldContext } from "."
import { fieldContainer } from "../atoms/field-container"
import { input } from "../atoms/input"
import { FieldMeta } from "./field-meta"

interface SimpleTextInputProps {
  title: string
  isMultiline?: boolean
}

export function SimpleTextInput({
  title,
  isMultiline = false,
}: SimpleTextInputProps) {
  const field = useFieldContext<string>()
  const Tag = isMultiline ? "textarea" : "input"

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{title}</label>

      <Tag
        id={field.name}
        name={field.name}
        value={field.state.value || ""}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        className={input({ isMultiline })}
      />

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
