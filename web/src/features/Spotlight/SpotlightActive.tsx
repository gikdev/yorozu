import { XIcon, CheckIcon, HouseIcon } from "@phosphor-icons/react"

interface SpotlightActiveProps {
  activeItem: string
  onCancel: () => void
  onDone: () => void
  onBack: () => void
}

export function SpotlightActive(p: SpotlightActiveProps) {
  return (
    <div className="flex flex-col h-dvh bg-mist-950 text-mist-400">
      <div className="flex-1 h-3/4 flex items-center justify-center p-4">
        <span className="text-3xl font-bold text-white text-center">
          {p.activeItem}
        </span>
      </div>

      <div className="h-1/4 flex items-stretch">
        <button
          type="button"
          onClick={p.onBack}
          className="flex-1 flex items-center justify-center gap-2 hover:bg-mist-900 hover:text-mist-100 cursor-pointer transition-colors"
        >
          <HouseIcon size={36} weight="bold" />
        </button>

        <button
          type="button"
          onClick={p.onDone}
          className="flex-1 flex items-center justify-center gap-2 hover:bg-emerald-950/50 hover:text-emerald-400 cursor-pointer transition-colors"
        >
          <CheckIcon size={36} weight="bold" />
        </button>

        <button
          type="button"
          onClick={p.onCancel}
          className="flex-1 flex items-center justify-center gap-2 hover:bg-red-950/50 hover:text-red-400 cursor-pointer transition-colors"
        >
          <XIcon size={36} weight="bold" />
        </button>
      </div>
    </div>
  )
}
