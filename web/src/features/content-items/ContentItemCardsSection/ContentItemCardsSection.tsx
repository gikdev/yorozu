import { useQuery } from "@tanstack/react-query"
import { ContentItemFormat, listContentItemsOptions } from "#/common/api/client"
import {
  BooksIcon,
  MagnifyingGlassIcon,
  SpinnerGapIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { linkOptions } from "@tanstack/react-router"
import { Fab } from "#/common/molecules/Fab"
import { extractErrorMessage } from "#/common/helpers/errors"
import { StateMessage } from "#/common/molecules/StateMessage"
import { useIsUnlocked } from "#/features/secret-mode/useSecretModeStore"
import { ContentItemCards } from "./ContentItemCards"
import { styleInput } from "#/common/atoms/input"
import { btn } from "#/common/atoms/btn"
import { useState, useMemo } from "react"

export function ContentItemCardsSection() {
  const isUnlocked = useIsUnlocked()

  // 1. Secret‑mode filtering (existing)
  const { data, status, error, refetch } = useQuery({
    ...listContentItemsOptions(),
    select: data =>
      isUnlocked ? data : { items: data.items.filter(i => !i.isSecret) },
  })

  // 2. Client‑side filter states
  const [searchQuery, setSearchQuery] = useState("")
  const [formatFilter, setFormatFilter] = useState<"" | ContentItemFormat>("")

  // 3. Apply search + format filters on top of the (already secret‑filtered) data
  const filteredItems = useMemo(() => {
    if (!data?.items) return null // not ready yet

    return data.items.filter(item => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFormat = !formatFilter || item.format === formatFilter

      return matchesSearch && matchesFormat
    })
  }, [data, searchQuery, formatFilter])

  // 4. Determine what to show
  let content: React.ReactNode

  if (status === "pending") {
    content = (
      <StateMessage
        mode="LOADING"
        icon={SpinnerGapIcon}
        title="Loading your library..."
      />
    )
  } else if (status === "error") {
    content = (
      <StateMessage
        icon={WarningCircleIcon}
        title="Failed to load content"
        description={extractErrorMessage(error)}
        mode="ERROR"
        retry={refetch}
      />
    )
  } else if (data.items.length === 0) {
    // Library is genuinely empty
    content = (
      <StateMessage
        icon={BooksIcon}
        title="Your library is empty"
        description="Tap the + button to add your first content"
        mode="NORMAL"
      />
    )
  } else if (filteredItems && filteredItems.length === 0) {
    // Filters yield no results
    content = (
      <StateMessage
        icon={MagnifyingGlassIcon}
        title="No matches found"
        description="Try adjusting your search or filters"
        mode="NORMAL"
      />
    )
  } else {
    // Show filtered list
    content = <ContentItemCards items={filteredItems!} />
  }

  return (
    <>
      <div className="flex flex-row gap-2 px-4 pt-4">
        <input
          className={styleInput({ className: "flex-1" })}
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select
          className={btn({ class: "*:bg-mist-900" })}
          value={formatFilter}
          onChange={e =>
            setFormatFilter(e.target.value as ContentItemFormat | "")
          }
        >
          <option value="">All</option>
          <option value={ContentItemFormat.READABLE}>
            {ContentItemFormat.READABLE}
          </option>
          <option value={ContentItemFormat.LISTENABLE}>
            {ContentItemFormat.LISTENABLE}
          </option>
          <option value={ContentItemFormat.WATCHABLE}>
            {ContentItemFormat.WATCHABLE}
          </option>
          <option value={ContentItemFormat.MIXED}>
            {ContentItemFormat.MIXED}
          </option>
        </select>
      </div>

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
