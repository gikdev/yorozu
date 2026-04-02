import type { ChangeEvent } from "react"
import { useFieldContext } from "."
import { TodoPriority, vTodoPriority } from "../api/client"
import { fieldContainer } from "../atoms/field-container"
import { FieldMeta } from "./field-meta"
import * as v from "valibot"
import { input } from "../atoms/input"

interface TodoPriorityInputProps {
  title: string
}

export function TodoPriorityInput({ title }: TodoPriorityInputProps) {
  const field = useFieldContext<TodoPriority>()

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const result = v.safeParse(vTodoPriority, e.target.value)

    if (!result.success) {
      field.handleChange(TodoPriority.UNKNOWN)
      console.warn("Failed to set todo priority because it was not valid!")
    } else {
      const priority = result.output
      field.handleChange(priority)
    }
  }

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{title}</label>

      <select
        id={field.name}
        name={field.name}
        value={field.state.value || TodoPriority.UNKNOWN}
        onBlur={field.handleBlur}
        onChange={handleChange}
        className={input()}
      >
        <option value={TodoPriority.UNKNOWN}>{TodoPriority.UNKNOWN}</option>
        <option value={TodoPriority.A_MUST_DO}>{TodoPriority.A_MUST_DO}</option>
        <option value={TodoPriority.B_SHOULD_DO}>
          {TodoPriority.B_SHOULD_DO}
        </option>
        <option value={TodoPriority.C_NICE_TO_DO}>
          {TodoPriority.C_NICE_TO_DO}
        </option>
        <option value={TodoPriority.D_DELEGATE}>
          {TodoPriority.D_DELEGATE}
        </option>
        <option value={TodoPriority.E_ELIMINATE}>
          {TodoPriority.E_ELIMINATE}
        </option>
      </select>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
