import {
  vEnergyLevelFilter,
  vTodoBucketFilter,
  vTodoSortBy,
  vTodoSortOrder,
} from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { useAppForm } from "#/common/forms"
import * as v from "valibot"

const vTodoListFilterFormData = v.object({
  bucket: vTodoBucketFilter,
  sortBy: vTodoSortBy,
  sortOrder: vTodoSortOrder,
  q: v.string(),
  excludeQuery: v.string(),
  availableEnergyLevel: vEnergyLevelFilter,
  isPomodoroFilteringEnabled: v.boolean(),
  availablePomodoros: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(0),
    v.maxValue(255),
  ),
})

export type TodoListFilterFormData = v.InferOutput<
  typeof vTodoListFilterFormData
>

type TodoListFilterFormProps = {
  onSubmit: (data: TodoListFilterFormData) => void
  onReset: () => void
  className: string
  defaultValues: TodoListFilterFormData
}

export function TodoListFilterForm(p: TodoListFilterFormProps) {
  const form = useAppForm({
    defaultValues: p.defaultValues,
    validators: {
      onChange: vTodoListFilterFormData,
    },
    onSubmit: ({ value }) => {
      p.onSubmit(value)
    },
  })

  return (
    <form.AppForm>
      <form
        className={p.className}
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        <form.AppField name="q">
          {field => <field.SimpleTextInput title="Query:" isMultiline />}
        </form.AppField>

        <form.AppField name="excludeQuery">
          {field => <field.SimpleTextInput title="Exclude Query *" />}
        </form.AppField>

        <form.AppField name="isPomodoroFilteringEnabled">
          {field => (
            <field.SimpleCheckboxInput title="Enable Pomodoro Filtering" />
          )}
        </form.AppField>

        <form.Subscribe selector={s => s.values.isPomodoroFilteringEnabled}>
          {enabled =>
            enabled && (
              <form.AppField name="availablePomodoros">
                {field => (
                  <field.CounterNumberInput title="Available Pomodoros:" />
                )}
              </form.AppField>
            )
          }
        </form.Subscribe>

        <form.AppField name="availableEnergyLevel">
          {field => (
            <field.TagOptionsInput
              title="Available Energy Level:"
              options={[
                { title: "All", value: "All" },
                { title: "Unknown", value: "Unknown" },
                { title: "Low", value: "Low" },
                { title: "Medium", value: "Medium" },
                { title: "High", value: "High" },
              ]}
            />
          )}
        </form.AppField>

        <form.AppField name="bucket">
          {field => (
            <field.TagOptionsInput
              title="Bucket:"
              options={[
                { title: "All", value: "All" },
                { title: "Uncategorized", value: "Uncategorized" },
                { title: "Next Actions", value: "NextActions" },
                { title: "Waiting", value: "Waiting" },
                { title: "Someday / Maybe", value: "SomedayMaybe" },
              ]}
            />
          )}
        </form.AppField>

        <form.AppField name="sortBy">
          {field => (
            <field.TagOptionsInput
              title="Sort By:"
              options={[
                { title: "None", value: "None" },
                { title: "Title", value: "Title" },
                { title: "Due Date", value: "DueDate" },
                { title: "Priority", value: "Priority" },
              ]}
            />
          )}
        </form.AppField>

        <form.AppField name="sortOrder">
          {field => (
            <field.TagOptionsInput
              title="Sort Order:"
              options={[
                { title: "Ascending", value: "Asc" },
                { title: "Descending", value: "Desc" },
              ]}
            />
          )}
        </form.AppField>

        <div className="flex flex-col gap-2">
          <button
            type="reset"
            onClick={() => {
              form.reset()
              p.onReset()
            }}
            className={btn({ className: "w-full" })}
          >
            Reset
          </button>

          <form.SimpleSubmitBtn
            className={btn({ className: "w-full", theme: "primary" })}
            title="Apply Filters"
          />
        </div>
      </form>
    </form.AppForm>
  )
}
