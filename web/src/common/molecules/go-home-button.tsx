import { HouseIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { btn } from "../atoms/btn"

export const GoHomeButton = () => (
  <Link to="/" className={btn({ isIcon: true })}>
    <HouseIcon size={24} />
  </Link>
)
