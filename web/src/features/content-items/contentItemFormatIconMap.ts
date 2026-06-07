import type { ContentItemFormatType } from "#/features/content-items/ContentItemFormatType"
import {
  ArticleNyTimesIcon,
  CircleDashedIcon,
  HeadphonesIcon,
  MonitorPlayIcon,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

export const contentItemFormatIconMap: Record<ContentItemFormatType, Icon> = {
  mixed: CircleDashedIcon,
  listenable: HeadphonesIcon,
  watchable: MonitorPlayIcon,
  readable: ArticleNyTimesIcon,
}
