import { intentGroups } from '../data/intentGroups'
import type { Intent } from '../types/Intent'
import { LinkItem } from './LinkItem'

interface LinkListProps {
  intent: Intent
}

export function LinkList(p: LinkListProps) {
  const group = intentGroups.find(g => g.intent === p.intent)
  if (!group) return null

  return (
    <div className='flex flex-col divide-y divide-mist-800'>
      {group.links.map(link => (
        <LinkItem key={link.id} link={link} />
      ))}
    </div>
  )
}
