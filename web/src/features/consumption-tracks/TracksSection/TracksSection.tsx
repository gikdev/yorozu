import { useQuery } from "@tanstack/react-query"
import { listTracksForContentItemEndpointOptions } from "#/common/api/client"
import { StateMessage } from "#/common/molecules/StateMessage"
import {
  SpinnerGapIcon,
  WarningCircleIcon,
  QueueIcon,
  PlusIcon,
} from "@phosphor-icons/react"
import { extractErrorMessage } from "#/common/helpers/errors"
import { TrackEntry } from "../TrackEntry"
import { RenderQuery } from "#/common/helpers/render-query"
import { Link } from "@tanstack/react-router"
import { btn } from "#/common/atoms/btn"

interface TracksSectionProps {
  id: string
}

export function TracksSection({ id }: TracksSectionProps) {
  const tracksQ = useQuery(
    listTracksForContentItemEndpointOptions({ path: { id } }),
  )

  return (
    <div className="relative flex flex-col flex-1 gap-4">
      <RenderQuery
        isList={true}
        status={tracksQ.status}
        listCount={tracksQ.data?.items.length!}
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
        fullView={() => (
          <div className="flex flex-col gap-4 flex-1">
            {tracksQ.data!.items.map(track => (
              <TrackEntry key={track.id} track={track} />
            ))}
          </div>
        )}
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

      <Link
        to="/apps/hondana/library/$id/tracks/new"
        className={btn({ theme: "primary" })}
        params={{ id }}
      >
        <PlusIcon size={24} />
        <span> Create new track </span>
      </Link>
    </div>
  )
}
