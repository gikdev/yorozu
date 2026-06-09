import type { Intent } from "./Intent"
import type { ILinkItem } from "./ILinkItem"

export type IntentGroup = {
  intent: Intent
  links: ILinkItem[]
}
