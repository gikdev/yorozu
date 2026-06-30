import { btn } from "#/common/atoms/btn"
import { ListBulletsIcon } from "@phosphor-icons/react"
import { Link, type LinkOptions } from "@tanstack/react-router"

interface ListCardProps extends LinkOptions {
  title: string
}

export function ListCard({ title, ...linkOptions }: ListCardProps) {
  return (
    <Link {...linkOptions} className={btn({ theme: "outline" })}>
      <ListBulletsIcon size={24} className="shrink-0" />
      <span className="truncate">{title}</span>
    </Link>
  )
}
