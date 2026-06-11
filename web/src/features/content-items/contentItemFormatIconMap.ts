import type { ContentItemFormat } from "#/common/api/client"
import {
  ArticleNyTimesIcon,
  CircleDashedIcon,
  HeadphonesIcon,
  MonitorPlayIcon,
} from "@phosphor-icons/react"
import type { Icon } from "@phosphor-icons/react"

export const contentItemFormatIconMap: Record<ContentItemFormat, Icon> = {
  Mixed: CircleDashedIcon,
  Listenable: HeadphonesIcon,
  Watchable: MonitorPlayIcon,
  Readable: ArticleNyTimesIcon,
}
