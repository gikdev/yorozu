import { useQuery } from "@tanstack/react-query"
import { ConsumptionCard } from "../ConsumptionCard"
import {
  ConsumptionStatus,
  IntentionType,
  listAllTracksEndpointOptions,
} from "#/common/api/client"
import { StateMessage } from "#/common/molecules/StateMessage"
import {
  SpinnerGapIcon,
  WarningCircleIcon,
  QueueIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react"
import { extractErrorMessage } from "#/common/helpers/errors"
import { useIsUnlocked } from "#/features/secret-mode/useSecretModeStore"
import { useMemo } from "react"
import { styleInput } from "#/common/atoms/input"
import { btn } from "#/common/atoms/btn"
import { RenderQuery } from "#/common/helpers/render-query"
import { Route } from "#/routes/apps/hondana/tracks.index"

export function ConsumptionTracksSection() {
  const isUnlocked = useIsUnlocked()
  const { q: searchQuery, intention: intentionFilter } = Route.useSearch()
  const navigate = Route.useNavigate()

  const tracksQ = useQuery({
    ...listAllTracksEndpointOptions(),
    select: data => {
      let items = [...data.items]

      const visibleStatuses: ConsumptionStatus[] = [
        ConsumptionStatus.IDLE,
        ConsumptionStatus.IN_PROGRESS,
        ConsumptionStatus.ON_HOLD,
      ]
      items = items.filter(i => visibleStatuses.includes(i.status))

      if (!isUnlocked) {
        items = items.filter(i => !i.isSecret)
      }

      return { items }
    },
  })

  const filteredItems = useMemo(() => {
    if (!tracksQ.data?.items) return null

    return tracksQ.data.items.filter(track => {
      const matchesSearch =
        !searchQuery ||
        track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.contentItemTitle
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())

      const matchesIntention =
        !intentionFilter || track.type === intentionFilter

      return matchesSearch && matchesIntention
    })
  }, [tracksQ.data, searchQuery, intentionFilter])

  return (
    <RenderQuery
      isList={true}
      status={tracksQ.status}
      listCount={tracksQ.data?.items.length ?? 0}
      loadingView={
        <StateMessage
          mode="LOADING"
          icon={SpinnerGapIcon}
          title="Loading your tracks..."
        />
      }
      emptyView={
        <StateMessage
          mode="NORMAL"
          icon={QueueIcon}
          title="No tracks yet"
          description="Start adding content to see your progress."
        />
      }
      fullView={() => {
        const hasResults = filteredItems && filteredItems.length > 0

        return (
          <>
            {/* Filter bar */}
            <div className="flex gap-2 px-4 pt-4">
              <input
                className={styleInput({ className: "flex-1 min-h-0 w-full" })}
                placeholder="Search..."
                value={searchQuery}
                onChange={e =>
                  navigate({
                    search: prev => ({ ...prev, q: e.target.value }),
                    replace: true,
                  })
                }
              />
              <select
                className={btn({
                  class: "*:bg-mist-900 max-w-max",
                  theme: "outline",
                })}
                value={intentionFilter ?? ""}
                onChange={e =>
                  navigate({
                    search: prev => ({
                      ...prev,
                      intention: (e.target.value || undefined) as
                        | IntentionType
                        | undefined,
                    }),
                    replace: true,
                  })
                }
              >
                <option value="">All</option>
                <option value={IntentionType.FUN}>Fun</option>
                <option value={IntentionType.EDUCATION}>Education</option>
                <option value={IntentionType.UNKNOWN}>Other</option>
              </select>
            </div>

            {/* Content area */}
            {hasResults ? (
              <div className="flex flex-col gap-4 p-4">
                {filteredItems!.map(track => (
                  <ConsumptionCard key={track.id} track={track} />
                ))}
              </div>
            ) : (
              <StateMessage
                mode="NORMAL"
                icon={MagnifyingGlassIcon}
                title="No matching tracks"
                description="Try different search terms or filters."
              />
            )}
          </>
        )
      }}
      errorView={
        <StateMessage
          mode="ERROR"
          icon={WarningCircleIcon}
          title="Failed to load tracks"
          description={extractErrorMessage(tracksQ.error)}
          retry={tracksQ.refetch}
        />
      }
    />
  )
}
