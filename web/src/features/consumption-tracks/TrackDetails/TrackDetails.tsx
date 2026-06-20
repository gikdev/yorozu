import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  startTrackEndpointMutation,
  resumeTrackEndpointMutation,
  pauseTrackEndpointMutation,
  completeTrackEndpointMutation,
  dropTrackEndpointMutation,
  deleteTrackEndpointMutation,
  updateTrackProgressEndpointMutation,
  type ConsumptionTrackResponse,
  getTrackEndpointQueryKey,
} from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { styleInput } from "#/common/atoms/input"
import { extractErrorMessage, onError } from "#/common/helpers/errors"
import { Link, useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import { useState } from "react"
import { CoverImage } from "#/common/molecules/CoverImage"
import {
  PlayIcon,
  PauseIcon,
  ArrowCounterClockwiseIcon,
  CheckIcon,
  XCircleIcon,
  TrashIcon,
  PencilSimpleIcon,
  PlusIcon,
  MinusIcon,
  EqualsIcon,
} from "@phosphor-icons/react"
import { DateRow } from "./DateRow"
import { TrackStatusCard } from "./TrackStatusCard"

interface TrackDetailsProps {
  track: ConsumptionTrackResponse
}

export function TrackDetails({ track }: TrackDetailsProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [changeAmount, setChangeAmount] = useState(1)

  const invalidateTrack = () =>
    queryClient.invalidateQueries({
      queryKey: getTrackEndpointQueryKey({ path: { id: track.id } }),
    })

  const startM = useMutation({
    ...startTrackEndpointMutation(),
    onError,
    onSuccess: invalidateTrack,
  })
  const pauseM = useMutation({
    ...pauseTrackEndpointMutation(),
    onError,
    onSuccess: invalidateTrack,
  })
  const resumeM = useMutation({
    ...resumeTrackEndpointMutation(),
    onError,
    onSuccess: invalidateTrack,
  })
  const completeM = useMutation({
    ...completeTrackEndpointMutation(),
    onError,
    onSuccess: invalidateTrack,
  })
  const dropM = useMutation({
    ...dropTrackEndpointMutation(),
    onError,
    onSuccess: invalidateTrack,
  })
  const deleteM = useMutation({
    ...deleteTrackEndpointMutation(),
    onError,
    onSuccess: () => {
      toast.success("Track deleted")
      navigate({ to: "/apps/hondana/tracks" })
    },
  })
  const progressM = useMutation({
    ...updateTrackProgressEndpointMutation(),
    onError,
    onSuccess: invalidateTrack,
  })

  const handleAction = (mutation: typeof startM, label: string) => {
    toast.promise(mutation.mutateAsync({ path: { id: track.id } }), {
      loading: `${label}...`,
      success: `${label} successful`,
      error: err => extractErrorMessage(err),
    })
  }

  const handleIncrement = () => {
    progressM.mutate({
      path: { id: track.id },
      body: { action: "Increment", amount: changeAmount },
    })
  }

  const handleDecrement = () => {
    progressM.mutate({
      path: { id: track.id },
      body: { action: "Decrement", amount: changeAmount },
    })
  }

  const handleSetAmount = () => {
    progressM.mutate({
      path: { id: track.id },
      body: { action: "Set", amount: changeAmount },
    })
  }

  const handleDelete = () => {
    if (!window.confirm("Delete this track? This cannot be undone.")) return
    deleteM.mutate({ path: { id: track.id } })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* ========== Content Item Header ========== */}
      <div className="flex flex-col items-center gap-3">
        <Link
          to="/apps/hondana/library/$id"
          params={{ id: track.contentItemId }}
          className="rounded-lg overflow-clip hover:-translate-y-1 transition-all"
        >
          <CoverImage
            coverImageUrl={track.contentItemCoverImageUrl}
            placeholderColor={track.contentItemPlaceholderColor}
            placeholderLetter={track.contentItemPlaceholderLetter}
            title={track.contentItemTitle}
          />
        </Link>

        <div className="flex flex-col items-center justify-center text-center gap-1 text-xs">
          <h1 className="text-2xl font-bold text-white">{track.title}</h1>

          <Link
            to="/apps/hondana/library/$id"
            params={{ id: track.contentItemId }}
            className="text-xs hover:text-mist-100 hover:underline"
          >
            {track.contentItemTitle}
          </Link>

          <p className="">
            <span>{track.contentItemFormat}</span>
            <span> • </span>
            <span>{track.type}</span>
          </p>

          <p className="">{track.description || "No description provided."}</p>
        </div>
      </div>

      <TrackStatusCard track={track} />

      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          value={changeAmount}
          onChange={e => setChangeAmount(Math.max(1, Number(e.target.value)))}
          className={styleInput({ className: "flex-1" })}
        />

        <button
          disabled={!track.canProgress}
          onClick={handleIncrement}
          className={btn({ theme: "primary", isIcon: true })}
        >
          <PlusIcon size={20} />
        </button>

        <button
          disabled={!track.canDecrement}
          onClick={handleDecrement}
          className={btn({ theme: "outline", isIcon: true })}
        >
          <MinusIcon size={20} />
        </button>

        <button
          disabled={!track.canProgress}
          onClick={handleSetAmount}
          className={btn({ theme: "outline", isIcon: true })}
        >
          <EqualsIcon size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          disabled={!track.canStart}
          onClick={() => handleAction(startM, "Start")}
          className={btn({ theme: "outline" })}
        >
          <PlayIcon size={20} />
          <span>Start</span>
        </button>

        <button
          disabled={!track.canPause}
          onClick={() => handleAction(pauseM, "Pause")}
          className={btn({ theme: "outline" })}
        >
          <PauseIcon size={20} />
          <span>Pause</span>
        </button>

        <button
          disabled={!track.canResume}
          onClick={() => handleAction(resumeM, "Resume")}
          className={btn({ theme: "outline" })}
        >
          <ArrowCounterClockwiseIcon size={20} />
          <span>Resume</span>
        </button>

        <button
          disabled={!track.canComplete}
          onClick={() => handleAction(completeM, "Complete")}
          className={btn({ theme: "outline" })}
        >
          <CheckIcon size={20} />
          <span>Complete</span>
        </button>

        <button
          disabled={!track.canDrop}
          onClick={() => handleAction(dropM, "Drop")}
          className={btn({ theme: "outline" })}
        >
          <XCircleIcon size={20} />
          <span>Drop</span>
        </button>

        <div className="inline-flex gap-1 *:flex-1">
          <Link
            to="/apps/hondana/tracks/$id/edit"
            params={{ id: track.id }}
            className={btn({ theme: "outline" })}
          >
            <PencilSimpleIcon size={20} />
          </Link>

          <button onClick={handleDelete} className={btn({ theme: "danger" })}>
            <TrashIcon size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm border-t border-mist-800 pt-4">
        <DateRow label="Created" date={track.createdAt} />
        <DateRow label="Started" date={track.startedAt} />
        <DateRow label="Paused" date={track.pausedAt} />
        <DateRow label="Completed" date={track.completedAt} />
        <DateRow label="Dropped" date={track.droppedAt} />
        <DateRow label="Updated" date={track.updatedAt} />
      </div>
    </div>
  )
}
