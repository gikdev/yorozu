import { useQuery } from "@tanstack/react-query"
import {
  ListPlusIcon,
  SpinnerGapIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { RenderQuery } from "#/common/helpers/render-query"
import {
  listContentItemsOptions,
} from "#/common/api/client"
import { StateMessage } from "#/common/molecules/StateMessage"
import { extractErrorMessage } from "#/common/helpers/errors"
import { ContentItemCard } from "#/features/content-items/ContentItemCard"

export function ItemsGrid() {
  const itemsQ = useQuery(listContentItemsOptions())

  return (
    <RenderQuery
      isList={true}
      status={itemsQ.status}
      listCount={itemsQ.data?.items.length ?? 0}
      errorView={
        <StateMessage
          icon={WarningCircleIcon}
          title="Failed to load content items"
          className="h-full"
          description={extractErrorMessage(itemsQ.error)}
          mode="ERROR"
          retry={itemsQ.refetch}
        />
      }
      loadingView={
        <StateMessage
          mode="LOADING"
          className="h-full"
          icon={SpinnerGapIcon}
          title="Please wait."
          description="Loading content items..."
        />
      }
      emptyView={
        <StateMessage
          mode="NORMAL"
          className="h-full"
          icon={ListPlusIcon}
          title="No content items yet"
          description="Create your first content item!"
        />
      }
      fullView={() => (
        <div className="flex flex-wrap content-start gap-4 p-4">
          {itemsQ.data!.items.map(item => (
            <ContentItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              coverImageUrl={item.coverImageUrl}
              placeholderLetter={item.placeholderLetter}
              isFavorited={item.isFavorited}
              isBookmarked={item.isBookmarked}
              isSecret={item.isSecret}
              isOngoing={item.isOngoing}
              locationType={item.locationType}
              locationValue={item.locationValue}
              format={item.format}
            />
          ))}
        </div>
      )}
    />
  )
}
