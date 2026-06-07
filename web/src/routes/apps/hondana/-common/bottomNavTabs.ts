import {
  GearIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { linkOptions } from "@tanstack/react-router"
import { type BottomNavItemShape } from "#/common/molecules/bottom-nav"

export const bottomNavTabs: BottomNavItemShape[] = [
  {
    id: "home",
    icon: HouseIcon,
    label: "Home",
    to: linkOptions({ to: "." }).to,
  },
  {
    id: "library",
    icon: SquaresFourIcon,
    label: "Library",
    to: linkOptions({ to: "." }).to,
    disabled: true,
  },
  {
    id: "search",
    icon: MagnifyingGlassIcon,
    label: "Search",
    to: linkOptions({ to: "." }).to,
    disabled: true,
  },
  {
    id: "settings",
    icon: GearIcon,
    label: "Settings",
    to: linkOptions({ to: "." }).to,
    disabled: true,
  },
]
