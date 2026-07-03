import { useFieldContext } from "."
import { btn } from "../atoms/btn"
import { fieldContainer } from "../atoms/field-container"
import { styleInput } from "../atoms/input"
import { FieldMeta } from "./field-meta"

interface SimpleTextInputProps {
  title: string
  isMultiline?: boolean
  suggestions?: string[]
}

export function SimpleTextInput({
  title,
  isMultiline = false,
  suggestions,
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
        className={styleInput({ isMultiline })}
      />

      {suggestions && suggestions.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1">
          {suggestions.map(s => (
            <button
              className={btn({ size: "sm" })}
              onClick={() => field.handleChange(s)}
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
