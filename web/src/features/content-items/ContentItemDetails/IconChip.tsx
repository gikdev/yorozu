import type { Icon } from "@phosphor-icons/react"

export const IconChip = (p: { label: string; icon: Icon }) => (
  <span className="bg-mist-800 rounded-lg gap-1 py-1 px-2 flex items-center justify-center">
    <p.icon size={16} />
    <span className="text-xs">{p.label}</span>
  </span>
)
