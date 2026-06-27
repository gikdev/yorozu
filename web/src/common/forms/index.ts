import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { SimpleTextInput } from "./simple-text-input"
import { CounterNumberInput } from "./counter-number-input"
import { SvgToggleInput } from "./svg-toggle-input"
import { PersianUtcDateInput } from "./simple-date-input"
import { SimpleWordListInput } from "./simple-word-list-input"
import { SimpleSubmitBtn } from "./simple-submit-btn"
import { TagOptionsInput } from "./tag-options-input"
import { SimpleCheckboxInput } from "./simple-checkbox-input"
import { ImgUrlWithPreviewInput } from "./ImgUrlWithPreviewInput"
import { TagsPickerInput } from "./TagsPickerInput"
import { SmartTagsInput } from "./SmartTagsInput"
import { LyricLineField } from "#/features/lyric-lines/LyricLinesForm"

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts()
const { useAppForm } = createFormHook({
  formContext,
  fieldContext,
  fieldComponents: {
    SimpleTextInput,
    SmartTagsInput,
    TagsPickerInput,
    ImgUrlWithPreviewInput,
    CounterNumberInput,
    SvgToggleInput,
    PersianUtcDateInput,
    SimpleWordListInput,
    TagOptionsInput,
    SimpleCheckboxInput,
    LyricLineField,
  },
  formComponents: {
    SimpleSubmitBtn,
  },
})

export { useAppForm, useFieldContext, useFormContext }
