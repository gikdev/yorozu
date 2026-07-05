import { SpinnerGapIcon } from '@phosphor-icons/react'
import { useFormContext } from '.'

interface SimpleSubmitBtnProps {
  title: string
  className: string
}

export function SimpleSubmitBtn(p: SimpleSubmitBtnProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={s => [s.canSubmit, s.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <button
          type='button'
          className={p.className}
          onClick={() => form.handleSubmit()}
          disabled={!canSubmit || isSubmitting}
        >
          {isSubmitting ? (
            <SpinnerGapIcon size={24} className='animate-spin' />
          ) : (
            <span>{p.title}</span>
          )}
        </button>
      )}
    </form.Subscribe>
  )
}
