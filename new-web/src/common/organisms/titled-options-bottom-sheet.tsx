import type { ComponentProps } from "react"
import { BottomSheet } from "../molecules/bottom-sheet"
import { BottomSheetHeader } from "../molecules/bottom-sheet-header"
import { OptionBtnList } from "../molecules/option-btn-list"

interface TitledOptionsBottomSheetProps {
  title: string
  onClose: () => void
  optionItems: ComponentProps<typeof OptionBtnList>["optionItems"]
}

export function TitledOptionsBottomSheet(p: TitledOptionsBottomSheetProps) {
  return (
    <BottomSheet onClose={p.onClose}>
      <div className="flex-1 flex flex-col">
        <BottomSheetHeader title={p.title} onClose={p.onClose} />

        <OptionBtnList optionItems={p.optionItems} />
      </div>
    </BottomSheet>
  )
}
