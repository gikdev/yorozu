import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { LyricLineField } from '#/features/lyric-lines/LyricLinesForm'
import { CounterNumberInput } from './counter-number-input'
import { ImgUrlWithPreviewInput } from './ImgUrlWithPreviewInput'
import { SimpleSelectInput } from './SimpleSelectInput'
import { SmartTagsInput } from './SmartTagsInput'
import { SimpleCheckboxInput } from './simple-checkbox-input'
import { PersianUtcDateInput } from './simple-date-input'
import { SimpleSubmitBtn } from './simple-submit-btn'
import { SimpleTextInput } from './simple-text-input'
import { SimpleWordListInput } from './simple-word-list-input'
import { SvgToggleInput } from './svg-toggle-input'
import { TagsPickerInput } from './TagsPickerInput'
import { TagOptionsInput } from './tag-options-input'

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
    SimpleSelectInput,
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
