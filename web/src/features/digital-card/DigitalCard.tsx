import { useState } from "react"
import { type Lang } from "./lang"
import { contents } from "./contents"
import { LangSwitch } from "./LangSwitch"
import { CardHeader } from "./CardHeader"
import { ContactModal } from "./ContactModal"

export function DigitalCard() {
  const [lang, setLang] = useState<Lang>("fa")
  const [open, setOpen] = useState(false)
  const isRtl = lang === "fa"
  const dir = isRtl ? "rtl" : "ltr"
  const content = contents[lang]

  return (
    <div
      className="font-main min-h-screen flex items-center justify-center bg-mist-950 px-4 py-8"
      dir={dir}
    >
      <div className="w-full max-w-sm rounded-2xl border border-mist-800 bg-mist-900 overflow-hidden">
        <div className="flex justify-end px-4 pt-4">
          <LangSwitch value={lang} onChange={setLang} />
        </div>

        <CardHeader {...content} />

        <div className="px-4 pb-5">
          <button
            onClick={() => setOpen(true)}
            className="w-full py-2.5 rounded-xl bg-sky-500 text-mist-950 text-sm font-medium hover:bg-sky-400 transition-colors"
          >
            {content.contactMe}
          </button>
        </div>
      </div>

      {open && (
        <ContactModal
          content={content}
          lang={lang}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}
