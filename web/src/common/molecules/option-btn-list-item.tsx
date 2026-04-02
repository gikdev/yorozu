import type { Icon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

export interface OptionBtnListItemProps {
  title: string
  helpText?: string
  Icon?: Icon
  onClick?: () => void
  href?: string
}

export function OptionBtnListItem(p: OptionBtnListItemProps) {
  const className =
    "flex items-center p-4 gap-2 cursor-pointer hover:bg-white/5 active:bg-white/10"

  const children = (
    <>
      {p.Icon ? <p.Icon size={20} /> : <span className="size-5" />}
      <span>{p.title}</span>
    </>
  )

  return p.href ? (
    <Link
      to={p.href}
      className={className}
      title={p.helpText}
      onClick={p.onClick}
      children={children}
    />
  ) : (
    <button
      type="button"
      className={className}
      title={p.helpText}
      onClick={p.onClick}
      children={children}
    />
  )
}
