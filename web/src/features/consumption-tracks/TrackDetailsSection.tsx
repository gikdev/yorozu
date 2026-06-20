import { useQuery } from "@tanstack/react-query"
import { getTrackEndpointOptions } from "#/common/api/client"
import { StateMessage } from "#/common/molecules/StateMessage"
import { SpinnerGapIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { extractErrorMessage } from "#/common/helpers/errors"
import { TrackDetails } from "./TrackDetails"
import { RenderQuery } from "#/common/helpers/render-query"

interface TrackDetailsSectionProps {
  trackId: string
}

export function TrackDetailsSection({ trackId }: TrackDetailsSectionProps) {
  const trackQ = useQuery({
    ...getTrackEndpointOptions({ path: { id: trackId } }),
  })

  return (
    <RenderQuery
      isList={false}
      status={trackQ.status}
      errorView={
        <StateMessage
          mode="ERROR"
          icon={WarningCircleIcon}
          title="Failed to load track"
          description={extractErrorMessage(trackQ.error)}
          retry={trackQ.refetch}
        />
      }
      loadingView={
        <StateMessage
          mode="LOADING"
          icon={SpinnerGapIcon}
          title="Loading track..."
        />
      }
      successView={() => <TrackDetails track={trackQ.data!} />}
    />
  )
}
