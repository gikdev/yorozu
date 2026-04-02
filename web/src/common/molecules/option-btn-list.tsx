import {
  OptionBtnListItem,
  type OptionBtnListItemProps,
} from "./option-btn-list-item"

export interface OptionBtnListProps {
  optionItems: OptionBtnListItemProps[]
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
