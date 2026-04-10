import type { ReactNode } from "react"

export interface HeaderProps {
  children: ReactNode
}

export const Header = (p: HeaderProps) => (
  <header className="flex items-center gap-2 border-b-2 border-mist-800 p-2">
    {p.children}
  </header>
)
