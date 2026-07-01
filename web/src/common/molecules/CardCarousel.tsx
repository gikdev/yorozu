import type { ReactNode } from "react"

export function CardCarousel({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 overflow-x-auto snap-x [scrollbar-width:none] hover:[scrollbar-width:auto]">
      {children}
    </div>
  )
}
