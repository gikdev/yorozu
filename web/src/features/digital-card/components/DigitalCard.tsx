import { LangSwitch } from "./LangSwitch"
import { CardHeader } from "./CardHeader"
import { ContactModal } from "./ContactModal"
import { useContentT } from "../hooks/useContentT"
import { useDigitalCardStore } from "../hooks/useDigitalCardStore"
import { useLang } from "../hooks/useLang"


export function DigitalCard() {
  const lang = useLang()
  const open = useDigitalCardStore(s => s.open)
  const setOpen = useDigitalCardStore(s => s.setOpen)
  const contactMe = useContentT("contactMe")
  const isRtl = lang === "fa"

  return (
    <div
      className="font-main min-h-screen flex items-center justify-center bg-mist-950 px-4 py-8"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-sm rounded-2xl border border-mist-800 bg-mist-900 overflow-hidden">
        <div className="flex justify-end px-4 pt-4">
          <LangSwitch />
        </div>

        <CardHeader />

        <div className="px-4 pb-5">
          <button
            onClick={() => setOpen(true)}
            className="w-full py-2.5 rounded-xl bg-sky-500 text-mist-950 text-sm font-medium hover:bg-sky-400 transition-colors"
          >
            {contactMe}
          </button>
        </div>
      </div>

      {open && <ContactModal />}
    </div>
  )
}
