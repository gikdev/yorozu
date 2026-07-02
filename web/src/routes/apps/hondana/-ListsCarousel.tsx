import {
  ArrowRightIcon,
  ListBulletsIcon,
  ListPlusIcon,
  SpinnerGapIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { AccentCardLink } from "#/common/molecules/AccentCardLink"
import { CardCarousel } from "#/common/molecules/CardCarousel"
import { RenderQuery } from "#/common/helpers/render-query"
import { useQuery } from "@tanstack/react-query"
import { listConsumptionTrackListsOptions } from "#/common/api/client"
import { StateMessage } from "#/common/molecules/StateMessage"
import { extractErrorMessage } from "#/common/helpers/errors"

const MAX_LISTS_TO_SHOW = 3

export function ListsCarousel() {
  const listsQ = useQuery(listConsumptionTrackListsOptions())

  return (
    <section className="flex flex-col gap-2">
      <p className="flex items-center justify-between">
        <span className="text-mist-100 font-bold text-xl">Lists</span>
        <Link
          to="/apps/hondana/lists"
          className="hover:underline hover:text-sky-400"
        >
          see all →
        </Link>
      </p>

      <RenderQuery
        isList={true}
        status={listsQ.status}
        listCount={listsQ.data?.items.length!}
        errorView={
          <StateMessage
            icon={WarningCircleIcon}
            title="Failed to load content"
            description={extractErrorMessage(listsQ.error)}
            mode="ERROR"
            retry={listsQ.refetch}
          />
        }
        loadingView={
          <StateMessage
            mode="LOADING"
            icon={SpinnerGapIcon}
            title="Loading your lists..."
          />
        }
        emptyView={
          <StateMessage
            mode="NORMAL"
            icon={ListPlusIcon}
            title="No lists..."
            description="Go and make a list for yourself!"
          />
        }
        fullView={() => (
          <CardCarousel>
            {listsQ.data?.items
              .slice(0, MAX_LISTS_TO_SHOW)
              .map(list => (
                <AccentCardLink
                  key={list.id}
                  to="/"
                  search={{}}
                  title={list.title}
                  icon={ListBulletsIcon}
                  iconClassName="text-sky-400"
                  cardClassName="bg-linear-to-br from-sky-500/20 to-mist-900 border-sky-500/30 hover:border-sky-400/50"
                />
              ))}

            <Link
              to="/apps/hondana/lists"
              className="snap-start shrink-0 w-40 grow group flex flex-col items-center justify-center gap-1 rounded-xl p-4 h-24 border border-mist-800 hover:border-sky-400/50 transition-colors text-mist-500 hover:text-sky-400"
            >
              <ArrowRightIcon
                size={24}
                className="group-hover:translate-x-0.5 transition-transform"
              />

              <span>See All</span>
            </Link>
          </CardCarousel>
        )}
      />
    </section>
  )
}
