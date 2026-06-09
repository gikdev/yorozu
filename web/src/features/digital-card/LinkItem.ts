import type { MultilingualString } from "./MultilingualString"

export type LinkItem = {
  id: string
  label: MultilingualString
  logo: string
  href: string
  disabled?: boolean
}
