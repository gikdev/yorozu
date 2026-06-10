import type { MultilingualString } from "./MultilingualString"

export type ILinkItem = {
  id: string
  label: MultilingualString
  logo: string
  href: string
  disabled?: boolean
}
