import { ArrowLeftIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

interface PageHeaderBackButtonProps {
  to: string
}

export function PageHeaderBackButton(p: PageHeaderBackButtonProps) {
  return (
    <Link
      to={p.to}
      aria-label="Go back"
      title="Go back"
      className="p-1 -ml-1 text-mist-50 hover:text-sky-400 transition-colors rounded"
    >
      <ArrowLeftIcon size={24} weight="bold" />
    </Link>
  )
}
