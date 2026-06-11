import { useQuery } from "@tanstack/react-query"
import { listContentItemsOptions } from "#/common/api/client"
import { ContentItemCard } from "../ContentItemCard/ContentItemCard"
import {
  BooksIcon,
  SpinnerGapIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { linkOptions } from "@tanstack/react-router"
import { Fab } from "#/common/molecules/Fab"
import { extractErrorMessage } from "#/common/helpers/errors"
import { StateMessage } from "#/common/molecules/StateMessage"

interface ContentItemCardsSectionProps {
  onItemDetails?: (id: string) => void
}

export function ContentItemCardsSection({
  onItemDetails,
}: ContentItemCardsSectionProps) {
  const { data, status, error, refetch } = useQuery(listContentItemsOptions())

  let content: React.ReactNode

  if (status === "pending") {
    content = (
      <StateMessage
        mode="LOADING"
        icon={SpinnerGapIcon}
        title="Loading your library..."
      />
    )
  }

  if (status === "error") {
    content = (
      <StateMessage
        icon={WarningCircleIcon}
        title="Failed to load content"
        description={extractErrorMessage(error)}
        mode="ERROR"
        retry={refetch}
      />
    )
  }

  if (status === "success" && data.items.length === 0) {
    content = (
      <StateMessage
        icon={BooksIcon}
        title="Your library is empty"
        description="Tap the + button to add your first content"
        mode="NORMAL"
      />
    )
  }

  if (status === "success" && data.items.length !== 0) {
    content = (
      <main className="flex-1 p-4 overflow-y-auto min-h-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {data.items.map(ci => (
          <ContentItemCard
            key={ci.id}
            coverImageUrl={ci.coverImageUrl}
            format={ci.format}
            hasAnyTracks={ci.hasAnyTracks}
            id={ci.id}
            isBookmarked={ci.isBookmarked}
            isFavorite={ci.isFavorite}
            isOngoing={ci.unitSpec?.isOngoing ?? false}
            isSecret={ci.isSecret}
            placeholderLetter={ci.placeholderLetter}
            title={ci.title}
            onDetails={() => onItemDetails?.(ci.id)}
          />
        ))}
      </main>
    )
  }

  return (
    <div className="relative flex-1 flex flex-col min-h-0">
      {content}

      <Fab
        bottom={24}
        right={24}
        type="link"
        to={linkOptions({ to: "/apps/hondana/library/new" }).to}
      />
    </div>
  )
}
