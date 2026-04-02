import { useFieldContext } from "."
import { fieldContainer } from "../atoms/field-container"
import { FieldMeta } from "./field-meta"
import { btn } from "../atoms/btn"

interface TagOptionsInputProps {
  title: string
  options: Array<{ title: string; value: string }>
}

export function TagOptionsInput(p: TagOptionsInputProps) {
  const field = useFieldContext<string>()

  return (
    <div className={fieldContainer()}>
      <p>{p.title}</p>

      <div className="flex flex-wrap gap-2">
        {p.options.map((option, i) => (
          <button
            key={i}
            type="button"
            onBlur={field.handleBlur}
            onClick={() => field.handleChange(option.value)}
            className={btn({
              theme: field.state.value === option.value ? "primary" : "glass",
            })}
          >
            {option.title}
          </button>
        ))}
      </div>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
