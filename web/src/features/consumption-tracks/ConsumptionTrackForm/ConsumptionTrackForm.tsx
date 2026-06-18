import { btn } from "#/common/atoms/btn"
import { useAppForm } from "#/common/forms"
import { IntentionType } from "#/common/api/client"
import type { ConsumptionTrackFormProps } from "./ConsumptionTrackFormProps"
import {
  consumptionTrackFormEmptyValues,
  ConsumptionTrackFormSchema,
} from "./ConsumptionTrackFormSchema"

const intentionTypeOptions: Array<{ title: string; value: IntentionType }> =
  Object.values(IntentionType).map(type => ({ title: type, value: type }))

export function ConsumptionTrackForm(p: ConsumptionTrackFormProps) {
  const form = useAppForm({
    defaultValues:
      p.mode === "UPDATE" ? p.initialValues : consumptionTrackFormEmptyValues,
    validators: {
      onSubmit: ConsumptionTrackFormSchema,
    },
    async onSubmit({ value }) {
      const reset = () => form.reset(consumptionTrackFormEmptyValues)
      await p.onSubmit(value, reset)
    },
  })

  return (
    <div className="flex flex-col gap-4">
      <form.AppForm>
        <form.AppField name="title">
          {field => <field.SimpleTextInput title="Title" />}
        </form.AppField>

        <form.AppField name="description">
          {field => <field.SimpleTextInput title="Description" />}
        </form.AppField>

        <form.AppField name="type">
          {field => (
            <field.TagOptionsInput
              title="Intention"
              options={intentionTypeOptions}
            />
          )}
        </form.AppField>

        <form.SimpleSubmitBtn
          className={btn({ theme: "primary" })}
          title="Submit"
        />
      </form.AppForm>
    </div>
  )
}
