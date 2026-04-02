import { useFieldContext } from "."
import { fieldContainer } from "../atoms/field-container"
import { FieldMeta } from "./field-meta"

interface SimpleCheckboxInputProps {
  title: string
}

export function SimpleCheckboxInput(p: SimpleCheckboxInputProps) {
  const field = useFieldContext<boolean>()

  return (
    <div className={fieldContainer()}>
      <label className="flex gap-1 items-center">
        <input
          type="checkbox"
          id={field.name}
          name={field.name}
          checked={field.state.value}
          onBlur={field.handleBlur}
          onChange={e => field.handleChange(e.target.checked)}
        />

        <span>{p.title}</span>
      </label>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
