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
import { useIsUnlocked } from "#/features/secret-mode/useSecretModeStore"

interface ContentItemCardsSectionProps {
  onItemDetails?: (id: string) => void
}

export function ContentItemCardsSection(p: ContentItemCardsSectionProps) {
  const isUnlocked = useIsUnlocked()
  const { data, status, error, refetch } = useQuery({
    ...listContentItemsOptions(),
    select: data =>
      isUnlocked
        ? data
        : {
            items: [...data.items].filter(i => !i.isSecret),
          },
  })

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
      <main className="flex-1 p-4 overflow-y-auto min-h-0 flex flex-row gap-2 flex-wrap items-start justify-start content-start justify-items-start">
        {data.items.map(ci => (
          <ContentItemCard
            id={ci.id}
            key={ci.id}
            title={ci.title}
            coverImageUrl={ci.coverImageUrl}
            format={ci.format}
            isBookmarked={ci.isBookmarked}
            isFavorite={ci.isFavorite}
            isOngoing={ci.unitSpec?.isOngoing ?? null}
            isSecret={ci.isSecret}
            placeholderLetter={ci.placeholderLetter}
            onDetails={() => p.onItemDetails?.(ci.id)}
          />
        ))}
      </main>
    )
  }

  return (
    <>
      {content}

      <Fab
        bottom={24}
        right={24}
        type="link"
        to={linkOptions({ to: "/apps/hondana/library/new" }).to}
      />
    </>
  )
}
