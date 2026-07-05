import { btn } from '../atoms/btn'
import { fieldContainer } from '../atoms/field-container'
import { useFieldContext } from '.'
import { FieldMeta } from './field-meta'

export type TagOption = {
  title: string
  value: string
}

interface TagOptionsInputProps {
  title: string
  options: Array<TagOption | string>
}

export function TagOptionsInput(p: TagOptionsInputProps) {
  const field = useFieldContext<string>()

  return (
    <div className={fieldContainer()}>
      <p>{p.title}</p>

      <div className='flex flex-wrap gap-2'>
        {p.options.map((option, i) => {
          const isStr = typeof option === 'string'
          const title = isStr ? option : option.title
          const value = isStr ? option : option.value

          return (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: いいんだよ！
              key={i}
              type='button'
              onBlur={field.handleBlur}
              onClick={() => field.handleChange(value)}
              className={btn({
                theme: field.state.value === value ? 'primary' : 'glass',
              })}
            >
              {title}
            </button>
          )
        })}
      </div>

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}
