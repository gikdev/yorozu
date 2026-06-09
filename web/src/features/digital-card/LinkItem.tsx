import type { ILinkItem } from "./ILinkItem"
import { useT } from "./useT"

interface LinkItemProps {
  link: ILinkItem
}

export function LinkItem(p: LinkItemProps) {
  const label = useT(p.link.label)

  return (
    <a
      href={p.link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 hover:bg-mist-800 transition-colors"
    >
      <img src={p.link.logo} alt="" className="w-7 h-7 rounded-md" />
      <span className="text-mist-300">{label}</span>
    </a>
  )
}
