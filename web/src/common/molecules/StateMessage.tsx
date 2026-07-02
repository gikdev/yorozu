import type { Icon } from "@phosphor-icons/react"
import { cn } from "tailwind-variants"
import { btn } from "../atoms/btn"

interface StateMessageProps {
  mode: "LOADING" | "ERROR" | "NORMAL"
  icon: Icon
  title: string
  description?: string
  retry?: () => void
  className?: string
}

export function StateMessage(p: StateMessageProps) {
  return (
    <div
      className={cn(
        "flex-1 flex flex-col items-center justify-center py-16 text-mist-400",
        p.className,
      )}
    >
      <p.icon
        size={48}
        className={cn("mb-4", p.mode === "LOADING" && "animate-spin")}
      />

      <p className="font-bold">{p.title}</p>

      {p.description && <p className="text-sm mt-1">{p.description}</p>}

      {p.mode === "ERROR" && p.retry && (
        <button
          onClick={p.retry}
          className={btn({ theme: "primary", className: "mt-6" })}
        >
          Try again
        </button>
      )}
    </div>
  )
}
