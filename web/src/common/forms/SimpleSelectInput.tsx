import { fieldContainer } from '../atoms/field-container'
import { styleInput } from '../atoms/input'
import { useFieldContext } from '.'
import { FieldMeta } from './field-meta'

export type SelectOption = {
  label: string
  value: string
}

interface SimpleSelectInputProps {
  title: string
  options: Array<SelectOption | string>
  placeholder?: string
}

export function SimpleSelectInput(p: SimpleSelectInputProps) {
  const field = useFieldContext<string>()

  // Normalize options to { label, value } format
  const normalizedOptions = p.options.map(option => {
    if (typeof option === 'string') {
      return { label: option, value: option }
    }
    return option
  })

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name} className='text-sm font-medium'>
        {p.title}
      </label>

      <select
        id={field.name}
        name={field.name}
        value={field.state.value ?? ''}
        onBlur={field.handleBlur}
        onChange={e => field.handleChange(e.target.value)}
        className={styleInput({
          class: 'w-full *:bg-mist-900 *:text-mist-100',
        })}
      >
        {p.placeholder && (
          <option value='' disabled>
            {p.placeholder}
          </option>
        )}
        {normalizedOptions.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
