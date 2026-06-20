import { useQuery } from "@tanstack/react-query"
import { ConsumptionCard } from "../ConsumptionCard"
import {
  ConsumptionStatus,
  IntentionType, // adjust import to your actual enum
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
import { useState, useMemo } from "react"
import { styleInput } from "#/common/atoms/input"
import { btn } from "#/common/atoms/btn"

export function ConsumptionTracksView() {
  const isUnlocked = useIsUnlocked()

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

  const [searchQuery, setSearchQuery] = useState("")
  const [intentionFilter, setIntentionFilter] = useState<IntentionType | "">("")

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

  // Early returns for loading, error, or empty library (before filters)
  if (tracksQ.status === "pending") {
    return (
      <StateMessage
        mode="LOADING"
        icon={SpinnerGapIcon}
        title="Loading your tracks..."
      />
    )
  }

  if (tracksQ.status === "error") {
    return (
      <StateMessage
        mode="ERROR"
        icon={WarningCircleIcon}
        title="Failed to load tracks"
        description={extractErrorMessage(tracksQ.error)}
        retry={tracksQ.refetch}
      />
    )
  }

  if (tracksQ.data.items.length === 0) {
    return (
      <StateMessage
        mode="NORMAL"
        icon={QueueIcon}
        title="No tracks yet"
        description="Start adding content to see your progress."
      />
    )
  }

  // At this point we know we have some data and filters are ready to apply
  const hasFilteredResults = filteredItems && filteredItems.length > 0

  return (
    <>
      {/* Shared filter bar */}
      <div className="flex gap-2 px-4 pt-4">
        <input
          className={styleInput({ className: "flex-1" })}
          placeholder="Search tracks..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select
          className={btn({ class: "*:bg-mist-900" })}
          value={intentionFilter}
          onChange={e =>
            setIntentionFilter(e.target.value as IntentionType | "")
          }
        >
          <option value="">All</option>
          <option value={IntentionType.FUN}>Fun</option>
          <option value={IntentionType.EDUCATION}>Education</option>
          <option value={IntentionType.UNKNOWN}>Other</option>
        </select>
      </div>

      {/* Content area: either filtered list or empty filter result */}
      {hasFilteredResults ? (
        <div className="flex flex-col gap-4 px-4 pt-4">
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
}
