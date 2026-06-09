import { useState } from "react"
import { type Lang } from "./lang"
import { contents } from "./contents"
import { LangSwitch } from "./LangSwitch"
import { CardHeader } from "./CardHeader"

export function DigitalCard() {
  const [lang, setLang] = useState<Lang>("fa")
  const isRtl = lang === "fa"
  const dir = isRtl ? "rtl" : "ltr"
  const content = contents[lang]

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-mist-950 px-4 py-8"
      dir={dir}
    >
      <div className="w-full max-w-sm rounded-2xl border border-mist-800 bg-mist-900 overflow-hidden">
        <div className="flex justify-end px-4 pt-4">
          <LangSwitch value={lang} onChange={setLang} />
        </div>

        <CardHeader {...content} />
      </div>
    </div>
  )
}
