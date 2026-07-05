import { TrashIcon } from '@phosphor-icons/react'
import gregorian from 'react-date-object/calendars/gregorian'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import DatePicker, { DateObject } from 'react-multi-date-picker'
import { btn } from '../atoms/btn'
import { fieldContainer } from '../atoms/field-container'
import { styleInput } from '../atoms/input'
import { useFieldContext } from '.'
import { FieldMeta } from './field-meta'

interface PersianUtcDateInputProps {
  title: string
}

export function PersianUtcDateInput(p: PersianUtcDateInputProps) {
  const field = useFieldContext<string | null>()

  const parseValue = () => {
    if (!field.state.value) return null

    try {
      const jsDate = new Date(field.state.value)

      return new DateObject(jsDate).convert(persian)
    } catch {
      return null
    }
  }

  const pickerValue = parseValue()

  const handleChange = (value: DateObject | null) => {
    if (!value) {
      field.handleChange(null)
      return
    }

    // Convert Persian → Gregorian → JS Date → UTC ISO
    const utcIso = value.convert(gregorian).toDate().toISOString()

    field.handleChange(utcIso)
  }

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{p.title}</label>

      <div className='flex items-center gap-1'>
        <DatePicker
          id={field.name}
          value={pickerValue}
          onChange={handleChange}
          calendar={persian}
          locale={persian_fa}
          format='YYYY/MM/DD'
          inputClass={styleInput({ className: 'w-full' })}
          containerClassName='flex-1'
        />

        <button
          type='button'
          className={btn({ isIcon: true })}
          onClick={() => field.handleChange(null)}
        >
          <TrashIcon size={24} />
        </button>
      </div>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
