import { Link, type LinkOptions } from "@tanstack/react-router"
import type { ComponentType } from "react"

interface IconProps {
  size?: number
  className?: string
}

interface AccentCardLinkProps extends LinkOptions {
  title: string
  icon: ComponentType<IconProps>
  cardClassName: string
  iconClassName: string
}

export function AccentCardLink({
  title,
  icon: Icon,
  cardClassName,
  iconClassName,
  ...linkOptions
}: AccentCardLinkProps) {
  return (
    <Link
      {...linkOptions}
      className={`snap-start shrink-0 w-40 grow group flex flex-col justify-between gap-2 rounded-xl p-4 h-24 border transition-colors ${cardClassName}`}
    >
      <Icon size={32} className={iconClassName} />
      <span className="text-mist-100 font-bold truncate">{title}</span>
    </Link>
  )
}
