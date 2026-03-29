import {
  EnergyLevel,
  TodoBucket,
  TodoEffortType,
  TodoPriority,
  vEnergyLevel,
  vTodoBucket,
  vTodoEffortType,
  vTodoPriority,
} from "#/common/api/client"
import { useAppForm } from "#/common/forms"
import { CheckCircleIcon, WarningOctagonIcon } from "@phosphor-icons/react"
import * as v from "valibot"

const vTodoFormData = v.object({
  title: v.pipe(v.string(), v.minLength(1)),
  description: v.string(),
  why: v.string(),
  pomodoroEstimate: v.pipe(
    v.number(),
    v.integer(),
    v.minValue(0),
    v.maxValue(255),
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
  | { mode: "CREATE" }
  | { mode: "EDIT"; defaultValues: TodoFormData }

type TodoFormProps = TodoFormModeProps & {
  onSubmit: (data: TodoFormData, onFinish: () => void) => void
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
  const form = useAppForm({
    defaultValues: p.mode === "CREATE" ? emptyValues : p.defaultValues,
    validators: {
      onChange: vTodoFormData,
    },
    onSubmit: ({ value }) => {
      const onFinish = () => form.reset()
      p.onSubmit(value, onFinish)
    },
  })

  return (
    <form
      className={p.className}
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.AppField name="title">
        {field => <field.SimpleTextInput title="Title *" />}
      </form.AppField>

      <form.AppField name="description">
        {field => <field.SimpleTextInput title="Description:" isMultiline />}
      </form.AppField>

      <form.AppField name="why">
        {field => <field.SimpleTextInput title="Why:" isMultiline />}
      </form.AppField>

      <form.AppField name="pomodoroEstimate">
        {field => <field.CounterNumberInput title="Estimated Pomodoros:" />}
      </form.AppField>

      <form.AppField name="contexts">
        {field => <field.SimpleWordListInput title="Contexts:" />}
      </form.AppField>

      <form.AppField name="dueDate">
        {field => <field.PersianUtcDateInput title="Due Date:" />}
      </form.AppField>

      <div className="flex items-center *:flex-1">
        <form.AppField name="isUrgent">
          {field => (
            <field.SvgToggleInput
              title="Is Urgent"
              Icon={WarningOctagonIcon}
              iconSelectedClass="text-amber-500"
            />
          )}
        </form.AppField>

        <form.AppField name="isDone">
          {field => (
            <field.SvgToggleInput
              title="Is Done"
              Icon={CheckCircleIcon}
              iconSelectedClass="text-emerald-500"
            />
          )}
        </form.AppField>
      </div>

      <form.AppField name="energyLevel">
        {field => <field.EnergyLevelInput title="Energy Level:" />}
      </form.AppField>

      <form.AppField name="effortType">
        {field => <field.EffortTypeInput title="Effort Type:" />}
      </form.AppField>

      <form.AppField name="priority">
        {field => <field.TodoPriorityInput title="Priority:" />}
      </form.AppField>

      <form.AppField name="bucket">
        {field => <field.TodoBucketInput title="Bucket:" />}
      </form.AppField>

      <form.Subscribe selector={s => s.values.bucket === TodoBucket.WAITING}>
        {shouldShow => shouldShow && (
          <>
            <form.AppField name="waitingForInfo.description">
              {field => <field.SimpleTextInput title="Waiting For Description:" isMultiline />}
            </form.AppField>

            <form.AppField name="waitingForInfo.reviewAt">
              {field => <field.PersianUtcDateInput title="Waiting For Review At:" />}
            </form.AppField>
          </>
        )}
      </form.Subscribe>

      <form.Subscribe selector={s => s.values}>
        {values => <pre className="overflow-x-auto max-w-full">{JSON.stringify(values, null, 2)}</pre>}
      </form.Subscribe>
    </form>
  )
}
