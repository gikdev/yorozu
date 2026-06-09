import type { Intent } from "./Intent"
import { intents } from "./intents"
import { IntentTab } from "./IntentTab"

interface IntentTabsProps {
  active: Intent
  onChange: (intent: Intent) => void
}

export function IntentTabs({ active, onChange }: IntentTabsProps) {
  return (
    <div className="flex border-b border-mist-800">
      {intents.map(intent => (
        <IntentTab
          key={intent}
          intent={intent}
          isActive={active === intent}
          onClick={() => onChange(intent)}
        />
      ))}
    </div>
  )
}
