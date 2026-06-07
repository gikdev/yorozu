import { type ReactNode } from "react"
import { stylePageHeader } from "./stylePageHeader"

interface PageHeaderProps {
  left?: ReactNode
  title?: ReactNode
  right?: ReactNode
}

export function PageHeader({ left, title, right }: PageHeaderProps) {
  return (
    <header className={stylePageHeader()}>
      <div className="flex justify-start">{left}</div>

      <div className="text-mist-100 font-bold text-xl text-center">{title}</div>

      <div className="flex justify-end">{right}</div>
    </header>
  )
}
