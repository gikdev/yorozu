import { useState } from "react"
import { intents } from "./intents"
import { intentGroups } from "./intentGroups"
import type { Intent } from "./Intent"
import { useContent } from "./useContent"
import { useDigitalCardStore } from "./useDigitalCardStore"
import { useLang } from "./useLang"
import { intentLabels } from "./intentLabels"

export function ContactModal() {
  const [intent, setIntent] = useState<Intent>("message")
  const lang = useLang()
  const content = useContent()
  const setOpen = useDigitalCardStore(s => s.setOpen)

  const group = intentGroups.find(g => g.intent === intent)!

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-mist-900 rounded-2xl border border-mist-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Tabs */}
        <div className="flex border-b border-mist-800">
          {intents.map(i => (
            <button
              key={i}
              onClick={() => setIntent(i)}
              className={`flex-1 py-2.5 text-xs transition-colors ${
                intent === i
                  ? "text-sky-400 border-b-2 border-sky-500"
                  : "text-mist-500 hover:text-mist-300"
              }`}
            >
              {intentLabels[i][lang]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-4 p-4">
          {group.links.map(link => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 hover:opacity-70 transition-opacity"
            >
              <img src={link.logo} alt="" className="w-12 h-12 rounded-xl" />
              <span className="text-xs text-mist-400 text-center leading-tight">
                {typeof link.label === "string" ? link.label : link.label[lang]}
              </span>
            </a>
          ))}
        </div>

        {/* Close */}
        <div className="px-4 pb-4">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-2 rounded-xl border border-mist-700 text-mist-400 text-sm hover:bg-mist-800 transition-colors"
          >
            {content.close}
          </button>
        </div>
      </div>
    </div>
  )
}
