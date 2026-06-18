import { Link } from "@tanstack/react-router"
import { useCallback, useMemo } from "react"
import { tv } from "tailwind-variants"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  GameControllerIcon,
  BookOpenIcon,
  QuestionIcon,
  PlayIcon,
  PlusIcon,
  ArrowCounterClockwiseIcon,
  CircleNotchIcon,
  CheckCircleIcon,
  XCircleIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ClockIcon,
} from "@phosphor-icons/react"
import { btn } from "#/common/atoms/btn"
import { extractErrorMessage } from "#/common/helpers/errors"
import {
  startTrackEndpointMutation,
  resumeTrackEndpointMutation,
  updateTrackProgressEndpointMutation,
  listTracksForContentItemEndpointQueryKey,
  type ConsumptionTrackResponse,
  IntentionType,
} from "#/common/api/client"

// ----- variants -----
const statusIconVariant = tv({
  variants: {
    status: {
      Idle: "text-mist-400",
      InProgress: "text-sky-400",
      Completed: "text-emerald-400",
      OnHold: "text-yellow-400",
      Dropped: "text-red-400",
    },
  },
})

// ----- helpers -----
const getIntetionTypeIcon = (type: IntentionType) => {
  if (type === "Education") return BookOpenIcon
  if (type === "Fun") return GameControllerIcon
  return QuestionIcon
}

const statusIconMap = {
  Idle: ClockIcon,
  InProgress: PlayCircleIcon,
  Completed: CheckCircleIcon,
  OnHold: PauseCircleIcon,
  Dropped: XCircleIcon,
} as const

const onError = (err: unknown) => toast.error(extractErrorMessage(err))

interface TrackEntryProps {
  track: ConsumptionTrackResponse
}

export function TrackEntry({ track }: TrackEntryProps) {
  const queryClient = useQueryClient()
  const path = { id: track.id }

  // mutations for the primary inline action
  const startMutation = useMutation(startTrackEndpointMutation())
  const resumeMutation = useMutation(resumeTrackEndpointMutation())
  const updateMutation = useMutation(updateTrackProgressEndpointMutation())

  const isAnyPending =
    startMutation.isPending ||
    resumeMutation.isPending ||
    updateMutation.isPending

  const invalidateTracks = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: listTracksForContentItemEndpointQueryKey({
        path: { id: track.contentItemId },
      }),
    })
  }, [queryClient, track.contentItemId])

  const handleStart = () =>
    startMutation.mutate({ path }, { onSuccess: invalidateTracks, onError })
  const handleResume = () =>
    resumeMutation.mutate({ path }, { onSuccess: invalidateTracks, onError })
  const handleIncrement = () =>
    updateMutation.mutate(
      { path, body: { amount: 1, action: "Increment" } },
      { onSuccess: invalidateTracks, onError },
    )

  const primaryAction = useMemo(() => {
    if (isAnyPending) return undefined

    switch (track.status) {
      case "Idle":
        return handleStart
      case "InProgress":
        return handleIncrement
      case "OnHold":
        return handleResume
      default:
        return undefined
    }
  }, [track.status, isAnyPending])

  const isTerminal = track.status === "Completed" || track.status === "Dropped"
  const IntentionIcon = getIntetionTypeIcon(track.type)
  const StatusIcon = statusIconMap[track.status]

  return (
    <div className="flex items-center gap-2 rounded-lg ps-4 border border-mist-800 bg-mist-900">
      <IntentionIcon
        size={24}
        weight="duotone"
        className="shrink-0 text-mist-400"
      />

      <Link
        to="/apps/hondana/tracks/$id"
        params={{ id: track.id }}
        className="flex-1 truncate text-mist-100 py-4 hover:underline hover:text-sky-500 cursor-pointer"
      >
        {track.title}
      </Link>

      <code className="font-bold text-mist-100 text-xl">
        {track.currentUnit}
      </code>

      <StatusIcon
        size={24}
        weight="fill"
        className={statusIconVariant({ status: track.status })}
      />

      <button
        type="button"
        disabled={isAnyPending || isTerminal}
        className={btn({ isIcon: true, size: "lg", class: "rounded-none" })}
        onClick={primaryAction}
      >
        {isAnyPending ? (
          <CircleNotchIcon size={24} className="animate-spin" />
        ) : track.status === "Idle" ? (
          <PlayIcon size={24} weight="fill" />
        ) : track.status === "InProgress" ? (
          <PlusIcon size={24} weight="bold" />
        ) : track.status === "OnHold" ? (
          <ArrowCounterClockwiseIcon size={24} weight="bold" />
        ) : (
          "-"
        )}
      </button>
    </div>
  )
}
