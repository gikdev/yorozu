import { ArrowRightIcon } from "@phosphor-icons/react"
import { Link, type LinkOptions } from "@tanstack/react-router"
import type { ComponentType } from "react"

interface IconProps {
  size?: number
  className?: string
}

interface CompactNavLinkProps extends LinkOptions {
  label: string
  icon: ComponentType<IconProps>
  borderHoverClassName: string
  iconClassName: string
}

export function CompactNavLink({
  label,
  icon: Icon,
  borderHoverClassName,
  iconClassName,
  ...linkOptions
}: CompactNavLinkProps) {
  return (
    <Link
      {...linkOptions}
      className={`group flex-1 flex items-center gap-2 rounded-lg px-4 py-3 border border-mist-800 transition-colors ${borderHoverClassName}`}
    >
      <Icon
        size={20}
        className={`text-mist-500 transition-colors ${iconClassName}`}
      />
      <span className="text-mist-100 flex-1">{label}</span>
      <ArrowRightIcon
        size={20}
        className={`text-mist-500 transition-colors ${iconClassName}`}
      />
    </Link>
  )
}
