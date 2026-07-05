import { useNavigate } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useContentT } from '../hooks/useContentT'
import { useDigitalCardStore } from '../hooks/useDigitalCardStore'
import { useLang } from '../hooks/useLang'
import { CardHeader } from './CardHeader'
import { ContactModal } from './ContactModal'
import { LangSwitch } from './LangSwitch'

const SECRET_CODE = 'leviosa'

function useSecretRoute(code: string, path: string) {
  const navigate = useNavigate()
  const buffer = useRef('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      buffer.current = (buffer.current + e.key.toLowerCase()).slice(
        -code.length,
      )

      if (buffer.current === code) {
        buffer.current = ''
        navigate({ to: path })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [code, path, navigate])
}

export function DigitalCard() {
  const lang = useLang()
  const open = useDigitalCardStore(s => s.open)
  const setOpen = useDigitalCardStore(s => s.setOpen)
  const contactMe = useContentT('contactMe')
  const isRtl = lang === 'fa'

  useSecretRoute(SECRET_CODE, '/apps')

  return (
    <div
      className='font-main min-h-screen flex items-center justify-center bg-mist-950 px-4 py-8'
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className='w-full max-w-sm rounded-2xl border border-mist-800 bg-mist-900 overflow-hidden'>
        <div className='flex justify-end px-4 pt-4'>
          <LangSwitch />
        </div>

        <CardHeader />

        <div className='px-4 pb-5'>
          <button
            type='button'
            onClick={() => setOpen(true)}
            className='w-full py-2.5 rounded-xl bg-sky-500 text-mist-950 text-sm font-medium hover:bg-sky-400 transition-colors'
          >
            {contactMe}
          </button>
        </div>
      </div>

      {open && <ContactModal />}
    </div>
  )
}
