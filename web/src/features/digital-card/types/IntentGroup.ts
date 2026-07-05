import type { ILinkItem } from './ILinkItem'
import type { Intent } from './Intent'

export type IntentGroup = {
  intent: Intent
  links: ILinkItem[]
}
