import { langs } from '../data/langs'
import { useDigitalCardStore } from '../hooks/useDigitalCardStore'
import type { Lang } from '../types/lang'

export function LangSwitch() {
  const lang = useDigitalCardStore(s => s.lang)
  const setLang = useDigitalCardStore(s => s.setLang)

  return (
    <select
      value={lang}
      onChange={e => setLang(e.target.value as Lang)}
      className='rounded-lg bg-mist-800 border border-mist-700 text-mist-300 text-xs p-1 focus:outline-none focus:border-sky-500'
    >
      {langs.map(l => (
        <option key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  )
}
