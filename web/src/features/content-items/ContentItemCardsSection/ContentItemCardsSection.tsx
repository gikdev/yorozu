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
import { RenderQuery } from "#/common/helpers/render-query"

export function ContentItemCardsSection() {
  const isUnlocked = useIsUnlocked()

  const { data, status, error, refetch } = useQuery({
    ...listContentItemsOptions(),
    select: data =>
      isUnlocked ? data : { items: data.items.filter(i => !i.isSecret) },
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [formatFilter, setFormatFilter] = useState<"" | ContentItemFormat>("")

  const filteredItems = useMemo(() => {
    if (!data?.items) return null
    return data.items.filter(item => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFormat = !formatFilter || item.format === formatFilter
      return matchesSearch && matchesFormat
    })
  }, [data, searchQuery, formatFilter])

  return (
    <>
      <RenderQuery
        isList={true}
        status={status}
        listCount={data?.items.length ?? 0}
        loadingView={
          <StateMessage
            mode="LOADING"
            icon={SpinnerGapIcon}
            title="Loading your library..."
          />
        }
        emptyView={
          <StateMessage
            icon={BooksIcon}
            title="Your library is empty"
            description="Tap the + button to add your first content"
            mode="NORMAL"
          />
        }
        fullView={() => {
          const hasFiltered = filteredItems && filteredItems.length > 0

          return (
            <>
              {/* Filter bar */}
              <div className="flex flex-row gap-2 px-4 pt-4">
                <input
                  className={styleInput({
                    className: "flex-1 min-h-0 w-full",
                  })}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <select
                  className={btn({
                    class: "*:bg-mist-900",
                    theme: "outline",
                  })}
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

              {/* Content area */}
              {hasFiltered ? (
                <ContentItemCards items={filteredItems!} />
              ) : (
                <StateMessage
                  icon={MagnifyingGlassIcon}
                  title="No matches found"
                  description="Try adjusting your search or filters"
                  mode="NORMAL"
                />
              )}
            </>
          )
        }}
        errorView={
          <StateMessage
            icon={WarningCircleIcon}
            title="Failed to load content"
            description={extractErrorMessage(error)}
            mode="ERROR"
            retry={refetch}
          />
        }
      />

      <Fab
        bottom={24}
        right={24}
        type="link"
        to={linkOptions({ to: "/apps/hondana/library/new" }).to}
      />
    </>
  )
}
