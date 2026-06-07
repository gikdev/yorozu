import type { ReactNode } from "react"
import { fullPage } from "../atoms/full-page"
import { phonePage } from "../atoms/phone-page"

interface PhonePageProps {
  children: ReactNode
}

export const PhonePage = (p: PhonePageProps) => (
  <div className={fullPage()}>
    <div className={phonePage()}>{p.children}</div>
  </div>
)
