import { tv } from "tailwind-variants"
import { useIntentLabel } from "../hooks/useIntentLabel"
import type { Intent } from "../types/Intent"

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

interface IntentTabProps {
  intent: Intent
  isActive: boolean
  onClick: () => void
}

export function IntentTab({ intent, isActive, onClick }: IntentTabProps) {
  const label = useIntentLabel(intent)

  return (
    <button onClick={onClick} className={styleIntentBtn({ isActive })}>
      {label}
    </button>
  )
}
