import type { ComponentProps } from "react"
import { OptionBtnListItem } from "./option-btn-list-item"

interface OptionBtnListProps {
  optionItems: Array<ComponentProps<typeof OptionBtnListItem>>
}

export function OptionBtnList(p: OptionBtnListProps) {
  return (
    <div className="flex flex-col divide-mist-800 divide-y">
      {p.optionItems.map((i, index) => (
        <OptionBtnListItem
          key={index}
          Icon={i.Icon}
          helpText={i.helpText}
          href={i.href}
          onClick={i.onClick}
          title={i.title}
        />
      ))}
    </div>
  )
}
