import {
  EnergyLevel,
  TodoBucket,
  TodoEffortType,
  TodoPriority,
  vEnergyLevel,
  vTodoBucket,
  vTodoEffortType,
  vTodoPriority,
  vWaitingForInfo,
  type CreateTodoRequest,
} from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { MinusIcon, PlusIcon } from "@phosphor-icons/react"
import { Field, useForm } from "@tanstack/react-form"
import * as v from "valibot"

const vTodoFormData = v.object({
  title: v.string(),
  description: v.string(),
  why: v.string(),
  pomodoroEstimate: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(0, "Invalid value: Expected uint8 to be >= 0"),
    v.maxValue(255, "Invalid value: Expected uint8 to be <= 255"),
  ),
  isUrgent: v.boolean(),
  isDone: v.boolean(),
  dueDate: v.nullable(v.pipe(v.string(), v.isoTimestamp())),
  contexts: v.array(v.string()),
  priority: vTodoPriority,
  effortType: vTodoEffortType,
  energyLevel: vEnergyLevel,
  bucket: vTodoBucket,
  waitingForInfo: v.nullable(
    v.object({
      description: v.string(),
      reviewAt: v.pipe(v.string(), v.isoTimestamp()),
    }),
  ),
})

type TodoFormData = v.InferOutput<typeof vTodoFormData>

type TodoFormModeProps =
  | {
      mode: "CREATE"
    }
  | {
      mode: "EDIT"
      defaultValues: TodoFormData
    }

type TodoFormProps = TodoFormModeProps & {
  onSubmit: (data: TodoFormData) => void
  className: string
}

const emptyValues: TodoFormData = {
  title: "",
  description: "",
  why: "",
  pomodoroEstimate: 0,
  isUrgent: false,
  isDone: false,
  dueDate: null,
  contexts: [],
  priority: TodoPriority.UNKNOWN,
  effortType: TodoEffortType.UNKNOWN,
  energyLevel: EnergyLevel.UNKNOWN,
  bucket: TodoBucket.UNCATEGORIZED,
  waitingForInfo: null,
}

export function TodoForm(p: TodoFormProps) {
  const form = useForm({
    defaultValues: p.mode === "CREATE" ? emptyValues : p.defaultValues,
    validators: {
      onChange: vTodoFormData,
    },
    onSubmit: ({ value }) => {
      p.onSubmit(value)
    },
  })

  return (
    <form
      className={p.className}
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field name="title">
        {(field) => (
          <div className="flex flex-col">
            <label htmlFor={field.name}>Title:</label>

            <input
              id={field.name}
              name={field.name}
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="p-2 mt-1"
            />

            {!field.state.meta.isValid && (
              <em className="mt-1 text-red-500">{field.state.meta.errors.map((e) => e?.message).join(", ")}</em>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="flex flex-col">
            <label htmlFor={field.name}>Description:</label>

            <textarea
              id={field.name}
              name={field.name}
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="p-2 mt-1"
            />

            {!field.state.meta.isValid && (
              <em className="mt-1 text-red-500">{field.state.meta.errors.map((e) => e?.message).join(", ")}</em>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="why">
        {(field) => (
          <div className="flex flex-col">
            <label htmlFor={field.name}>Why:</label>

            <textarea
              id={field.name}
              name={field.name}
              value={field.state.value || ""}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              className="p-2 mt-1"
            />

            {!field.state.meta.isValid && (
              <em className="mt-1 text-red-500">{field.state.meta.errors.map((e) => e?.message).join(", ")}</em>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="pomodoroEstimate">
        {(field) => (
          <div className="flex flex-col">
            <label htmlFor={field.name}>Pomodoro Estimate:</label>

            <div className="flex items-center gap-1">
              <button className={btn({ isIcon: true })} onClick={() => field.handleChange(field.state.value - 1)}>
                <MinusIcon size={24} />
              </button>

              <input
                id={field.name}
                name={field.name}
                value={field.state.value || 0}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number.isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber)}
                className="p-2 flex-1 text-center"
                type="number"
                min={0}
                max={255}
              />

              <button className={btn({ isIcon: true })} onClick={() => field.handleChange(field.state.value + 1)}>
                <PlusIcon size={24} />
              </button>
            </div>

            {!field.state.meta.isValid && (
              <em className="mt-1 text-red-500">{field.state.meta.errors.map((e) => e?.message).join(", ")}</em>
            )}
          </div>
        )}
      </form.Field>
    </form>
  )
}
