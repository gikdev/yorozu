import {
  GearIcon,
  HouseIcon,
  QueueIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react"
import { linkOptions } from "@tanstack/react-router"
import { type BottomNavItemShape } from "#/common/molecules/bottom-nav"

export const bottomNavTabs: BottomNavItemShape[] = [
  {
    id: "home",
    icon: HouseIcon,
    label: "Home",
    to: linkOptions({ to: "/apps/hondana" }).to,
    disabled: false,
  },
  {
    id: "library",
    icon: SquaresFourIcon,
    label: "Library",
    to: linkOptions({ to: "/apps/hondana/library" }).to,
    disabled: false,
  },
  {
    id: "tracks",
    icon: QueueIcon,
    label: "Tracks",
    to: linkOptions({ to: "/apps/hondana/tracks" }).to,
    disabled: false,
  },
  {
    id: "settings",
    icon: GearIcon,
    label: "Settings",
    to: linkOptions({ to: "/apps/hondana/settings" }).to,
    disabled: false,
  },
]
