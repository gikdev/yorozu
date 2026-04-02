import { XIcon } from "@phosphor-icons/react"
import { btn } from "../atoms/btn"

interface BottomSheetHeaderProps {
  title: string
  onClose: () => void
}

export function BottomSheetHeader(p: BottomSheetHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2 px-2 ps-4 border-b-2 border-mist-800">
      <p>{p.title}</p>

      <button
        type="button"
        className={btn({ isIcon: true })}
        onClick={p.onClose}
      >
        <XIcon size={24} />
      </button>
    </div>
  )
}
