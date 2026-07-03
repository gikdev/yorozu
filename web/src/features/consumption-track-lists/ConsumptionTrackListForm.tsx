import { z } from "zod"
import { btn } from "#/common/atoms/btn"
import { useAppForm } from "#/common/forms"

const zConsumptionTrackListFormValues = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string(),
})

export type ConsumptionTrackListFormValues = z.infer<
  typeof zConsumptionTrackListFormValues
>

const emptyValues: ConsumptionTrackListFormValues = {
  title: "",
  description: "",
}

export type ConsumptionTrackListFormSubmitHandler = (
  values: ConsumptionTrackListFormValues,
  empty: () => void,
) => Promise<void>

type ConsumptionTrackListFormProps = {
  submitLabel: string
  onCancel: () => void
  onSubmit: ConsumptionTrackListFormSubmitHandler
} & (
  | { mode: "CREATE" }
  | { mode: "EDIT"; initialValues: ConsumptionTrackListFormValues }
)

export function ConsumptionTrackListForm(p: ConsumptionTrackListFormProps) {
  const defaultValues = p.mode === "CREATE" ? emptyValues : p.initialValues
  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: zConsumptionTrackListFormValues,
    },
    onSubmit: async ({ value }) => {
      const reset = () => form.reset(emptyValues)
      await p.onSubmit(value, reset)
    },
  })

  return (
    <form.AppForm>
      <div className="flex flex-col gap-4">
        <form.AppField name="title">
          {field => <field.SimpleTextInput title="Title" />}
        </form.AppField>

        <form.AppField name="description">
          {field => <field.SimpleTextInput title="Description" isMultiline />}
        </form.AppField>

        <div className="flex gap-2">
          <form.SimpleSubmitBtn
            className={btn({ theme: "primary" })}
            title={p.submitLabel}
          />

          <button
            type="button"
            onClick={() => form.reset(defaultValues)}
            className={btn()}
          >
            Reset
          </button>

          <button type="button" onClick={p.onCancel} className={btn()}>
            Cancel
          </button>
        </div>
      </div>
    </form.AppForm>
  )
}
