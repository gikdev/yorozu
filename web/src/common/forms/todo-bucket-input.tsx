import type { ChangeEvent } from "react"
import { useFieldContext } from "."
import { TodoBucket, vTodoBucket } from "../api/client"
import { fieldContainer } from "../atoms/field-container"
import { FieldMeta } from "./field-meta"
import * as v from "valibot"
import { input } from "../atoms/input"

interface TodoBucketInputProps {
  title: string
}

export function TodoBucketInput({ title }: TodoBucketInputProps) {
  const field = useFieldContext<TodoBucket>()

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const result = v.safeParse(vTodoBucket, e.target.value)

    if (!result.success) {
      field.handleChange(TodoBucket.UNCATEGORIZED)
      console.warn("Failed to set todo bucket because it was not valid!")
    } else {
      const bucket = result.output
      field.handleChange(bucket)
    }
  }

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{title}</label>

      <select
        id={field.name}
        name={field.name}
        value={field.state.value || TodoBucket.UNCATEGORIZED}
        onBlur={field.handleBlur}
        onChange={handleChange}
        className={input()}
      >
        <option value={TodoBucket.UNCATEGORIZED}>
          {TodoBucket.UNCATEGORIZED}
        </option>
        <option value={TodoBucket.NEXT_ACTIONS}>
          {TodoBucket.NEXT_ACTIONS}
        </option>
        <option value={TodoBucket.SOMEDAY_MAYBE}>
          {TodoBucket.SOMEDAY_MAYBE}
        </option>
        <option value={TodoBucket.WAITING}>{TodoBucket.WAITING}</option>
      </select>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
