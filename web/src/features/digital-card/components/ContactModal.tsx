import { useState } from "react"
import { IntentTabs } from "./IntentTabs"
import { LinkList } from "./LinkList"
import { useContentT } from "../hooks/useContentT"
import { useDigitalCardStore } from "../hooks/useDigitalCardStore"
import type { Intent } from "../types/Intent"

export function ContactModal() {
  const [intent, setIntent] = useState<Intent>("message")
  const closeLabel = useContentT("close")
  const setOpen = useDigitalCardStore(s => s.setOpen)

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg bg-mist-900 rounded-2xl border border-mist-800 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <IntentTabs active={intent} onChange={setIntent} />

        <div className="p-4">
          <LinkList intent={intent} />
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-2 rounded-xl border border-mist-700 text-mist-400 text-sm hover:bg-mist-800 transition-colors"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
