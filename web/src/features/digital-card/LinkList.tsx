import type { Intent } from "./Intent"
import { intentGroups } from "./intentGroups"
import type { Lang } from "./lang"

type LinkListProps = {
  intent: Intent
  lang: Lang
}

export function LinkList(p: LinkListProps) {
  const group = intentGroups.find(g => g.intent === p.intent)
  if (!group) return null

  return (
    <div className="flex flex-col divide-y divide-mist-800">
      {group.links.map(link => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 hover:bg-mist-800 transition-colors"
        >
          <img src={link.logo} alt="" className="w-7 h-7 rounded-md" />
          <span className="text-mist-300">{link.label[p.lang]}</span>
        </a>
      ))}
    </div>
  )
}
