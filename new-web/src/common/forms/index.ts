import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { SimpleTextInput } from "./simple-text-input"
import { CounterNumberInput } from "./counter-number-input"
import { SvgToggleInput } from "./svg-toggle-input"
import { EnergyLevelInput } from "./energy-level-input"
import { EffortTypeInput } from "./effort-type-input"
import { TodoPriorityInput } from "./todo-priority-input"
import { TodoBucketInput } from "./todo-bucket-input"
import { PersianUtcDateInput } from "./simple-date-input"
import { SimpleWordListInput } from "./simple-word-list-input"
import { SimpleSubmitBtn } from "./simple-submit-btn"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()
const { useAppForm } = createFormHook({
  formContext,
  fieldContext,
  fieldComponents: {
    SimpleTextInput,
    CounterNumberInput,
    SvgToggleInput,
    EnergyLevelInput,
    EffortTypeInput,
    TodoPriorityInput,
    TodoBucketInput,
    PersianUtcDateInput,
    SimpleWordListInput,
  },
  formComponents: {
    SimpleSubmitBtn,
  },
})

export { useAppForm, useFieldContext, useFormContext }
