import { tv } from "tailwind-variants"
import type { Intent } from "./Intent"
import { intentLabels } from "./intentLabels"
import { intents } from "./intents"
import { useLang } from "./useLang"

const styleIntentBtn = tv({
  base: "flex-1 py-2.5 text-xs transition-colors",
  variants: {
    isActive: {
      false: "text-mist-500 hover:text-mist-300",
      true: "text-sky-400 border-b-2 border-sky-500",
    },
  },
  defaultVariants: { isActive: false },
})

interface IntentTabsProps {
  active: Intent
  onChange: (intent: Intent) => void
}

export function IntentTabs({ active, onChange }: IntentTabsProps) {
  const lang = useLang()

  return (
    <div className="flex border-b border-mist-800">
      {intents.map(intent => (
        <button
          key={intent}
          onClick={() => onChange(intent)}
          className={styleIntentBtn({ isActive: active === intent })}
        >
          {intentLabels[intent][lang]}
        </button>
      ))}
    </div>
  )
}
