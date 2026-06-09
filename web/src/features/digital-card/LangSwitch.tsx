import type { Lang } from "./lang"
import { langs } from "./langs"

type Props = {
  value: Lang
  onChange: (lang: Lang) => void
}

export function LangSwitch({ value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value as Lang)}
      className="rounded-lg bg-mist-800 border border-mist-700 text-mist-300 text-xs p-1 focus:outline-none focus:border-sky-500"
    >
      {langs.map(l => (
        <option key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  )
}
