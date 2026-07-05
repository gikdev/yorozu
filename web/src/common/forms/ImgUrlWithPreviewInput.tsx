import { ImageBrokenIcon, ImageIcon } from '@phosphor-icons/react'
import { type ChangeEvent, useState } from 'react'
import { tv } from 'tailwind-variants'
import { fieldContainer } from '../atoms/field-container'
import { styleInput } from '../atoms/input'
import { useFieldContext } from '.'
import { FieldMeta } from './field-meta'

type PreviewState = 'empty' | 'preview' | 'error'

interface ImgUrlWithPreviewInputProps {
  title: string
}

export function ImgUrlWithPreviewInput(p: ImgUrlWithPreviewInputProps) {
  const field = useFieldContext<string>()
  const [imgError, setImgError] = useState(false)

  const url = field.state.value || ''
  const previewState: PreviewState = url
    ? imgError
      ? 'error'
      : 'preview'
    : 'empty'

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImgError(false)
    field.handleChange(e.target.value)
  }

  return (
    <div className={fieldContainer()}>
      <label htmlFor={field.name}>{p.title}</label>

      <input
        id={field.name}
        name={field.name}
        value={url}
        onBlur={field.handleBlur}
        onChange={handleInputChange}
        className={styleInput()}
        placeholder='https://_______.com/___.jpg'
      />

      <PreviewBox
        state={previewState}
        url={url}
        onError={() => setImgError(true)}
        onLoad={() => setImgError(false)}
      />

      <FieldMeta meta={field.state.meta} />
    </div>
  )
}

interface PreviewBoxProps {
  state: 'empty' | 'preview' | 'error'
  url?: string
  onError: () => void
  onLoad: () => void
}

const stylePreviewBoxBase = tv({
  base: 'flex h-32 w-32 flex-col gap-2 items-center justify-center text-center rounded-lg p-2 mx-auto',
})

function PreviewBox(p: PreviewBoxProps) {
  if (p.state === 'preview' && p.url) {
    return (
      <img
        src={p.url}
        alt='Cover preview'
        onError={p.onError}
        onLoad={p.onLoad}
        className={stylePreviewBoxBase({
          className: 'object-cover p-0 border-0',
        })}
      />
    )
  }

  if (p.state === 'error') {
    return (
      <div
        className={stylePreviewBoxBase({
          className: 'bg-red-950/50 text-red-300',
        })}
      >
        <ImageBrokenIcon size={32} />
        <span className='text-xs'>Error previewing image</span>
      </div>
    )
  }

  return (
    <div
      className={stylePreviewBoxBase({
        className: 'bg-mist-900 text-mist-400',
      })}
    >
      <ImageIcon size={32} />
      <span className='text-xs'>Nothing to preview</span>
    </div>
  )
}
