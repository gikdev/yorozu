import {
  CircleNotchIcon,
  PlayIcon,
  PlusIcon,
  CheckIcon,
  CheckCircleIcon,
  PauseIcon,
  ArrowCounterClockwiseIcon,
  XIcon,
  SquareIcon,
  MinusIcon,
} from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  startTrackEndpointMutation,
  pauseTrackEndpointMutation,
  resumeTrackEndpointMutation,
  completeTrackEndpointMutation,
  dropTrackEndpointMutation,
  updateTrackProgressEndpointMutation,
  listTracksForContentItemEndpointQueryKey,
  type ConsumptionTrackResponse,
} from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"
import { ConsumptionCardProgress } from "../ConsumptionCard/ConsumptionCardProgress"
import { tv } from "tailwind-variants"

const styleContainer = tv({
  base: "flex flex-col gap-2 rounded-lg bg-mist-900 border border-mist-800 p-3",
})

const styleHeader = tv({
  base: "flex flex-row items-center justify-between gap-2",
})

const styleTitleRow = tv({
  base: "flex flex-col gap-0.5 flex-1 min-w-0",
})

const styleTitle = tv({
  base: "text-sm font-medium text-mist-100 truncate",
})

const styleStatusBadge = tv({
  base: "text-xs px-1.5 py-0.5 rounded font-medium shrink-0",
  variants: {
    status: {
      Idle: "bg-mist-800 text-mist-400",
      InProgress: "bg-sky-900 text-sky-300",
      Completed: "bg-emerald-900 text-emerald-300",
      OnHold: "bg-yellow-900 text-yellow-300",
      Dropped: "bg-red-900 text-red-300",
    },
  },
})

const styleActions = tv({
  base: "flex flex-row gap-1.5 flex-wrap",
})

const styleActionBtn = tv({
  base: "flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-opacity",
  variants: {
    variant: {
      default: "bg-mist-800 text-mist-200 hover:bg-mist-700",
      primary: "bg-sky-800 text-sky-100 hover:bg-sky-700",
      success: "bg-emerald-800 text-emerald-100 hover:bg-emerald-700",
      danger: "bg-red-900 text-red-300 hover:bg-red-800",
    },
    disabled: {
      true: "opacity-40 cursor-not-allowed pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

const onError = (err: unknown) => toast.error(extractErrorMessage(err))

interface TrackEntryProps {
  track: ConsumptionTrackResponse
}

export function TrackEntry({ track }: TrackEntryProps) {
  const queryClient = useQueryClient()
  const queryKey = listTracksForContentItemEndpointQueryKey({
    path: { id: track.contentItemId },
  })
  const invalidate = () => queryClient.invalidateQueries({ queryKey })

  const {
    id,
    title,
    status,
    currentUnit,
    totalUnits,
    canStart,
    canPause,
    canResume,
    canComplete,
    canDrop,
    canProgress,
    canDecrement,
  } = track

  const startM = useMutation({
    ...startTrackEndpointMutation(),
    onSuccess: invalidate,
    onError,
  })
  const pauseM = useMutation({
    ...pauseTrackEndpointMutation(),
    onSuccess: invalidate,
    onError,
  })
  const resumeM = useMutation({
    ...resumeTrackEndpointMutation(),
    onSuccess: invalidate,
    onError,
  })
  const completeM = useMutation({
    ...completeTrackEndpointMutation(),
    onSuccess: invalidate,
    onError,
  })
  const dropM = useMutation({
    ...dropTrackEndpointMutation(),
    onSuccess: invalidate,
    onError,
  })
  const progressM = useMutation({
    ...updateTrackProgressEndpointMutation(),
    onSuccess: invalidate,
    onError,
  })

  const isAnyPending =
    startM.isPending ||
    pauseM.isPending ||
    resumeM.isPending ||
    completeM.isPending ||
    dropM.isPending ||
    progressM.isPending

  const isCompleted = status === "Completed"
  const isDropped = status === "Dropped"
  const hasStarted = !canStart // once started, canStart becomes false forever

  return (
    <div className={styleContainer()}>
      <div className={styleHeader()}>
        <div className={styleTitleRow()}>
          <span className={styleTitle()}>{title}</span>
        </div>
        <span className={styleStatusBadge({ status })}>
          {isAnyPending ? (
            <CircleNotchIcon size={12} className="animate-spin inline" />
          ) : (
            status
          )}
        </span>
      </div>

      <ConsumptionCardProgress current={currentUnit} total={totalUnits} />

      <div className={styleActions()}>
        {/* Start — hidden once the track has been started */}
        {!hasStarted && (
          <button
            className={styleActionBtn({ variant: "primary" })}
            onClick={() => startM.mutate({ path: { id } })}
            disabled={isAnyPending}
          >
            <PlayIcon size={12} />
            Start
          </button>
        )}

        {/* Decrement */}
        {hasStarted && (
          <button
            className={styleActionBtn({ disabled: !canDecrement })}
            onClick={() =>
              progressM.mutate({
                path: { id },
                body: { amount: 1, action: "Decrement" },
              })
            }
            disabled={isAnyPending || !canDecrement}
          >
            <MinusIcon size={12} />
          </button>
        )}

        {/* Progress */}
        {hasStarted && (
          <button
            className={styleActionBtn({
              variant: "primary",
              disabled: !canProgress,
            })}
            onClick={() =>
              progressM.mutate({
                path: { id },
                body: { amount: 1, action: "Increment" },
              })
            }
            disabled={isAnyPending || !canProgress}
          >
            <PlusIcon size={12} />
            Progress
          </button>
        )}

        {/* Pause */}
        {hasStarted && !isCompleted && !isDropped && (
          <button
            className={styleActionBtn({ disabled: !canPause })}
            onClick={() => pauseM.mutate({ path: { id } })}
            disabled={isAnyPending || !canPause}
          >
            <PauseIcon size={12} />
            Pause
          </button>
        )}

        {/* Resume */}
        {hasStarted && !isCompleted && !isDropped && (
          <button
            className={styleActionBtn({ disabled: !canResume })}
            onClick={() => resumeM.mutate({ path: { id } })}
            disabled={isAnyPending || !canResume}
          >
            <ArrowCounterClockwiseIcon size={12} />
            Resume
          </button>
        )}

        {/* Complete */}
        {!isCompleted && !isDropped && (
          <button
            className={styleActionBtn({
              variant: "success",
              disabled: !canComplete,
            })}
            onClick={() => completeM.mutate({ path: { id } })}
            disabled={isAnyPending || !canComplete}
          >
            <CheckIcon size={12} />
            Complete
          </button>
        )}

        {/* Drop */}
        {!isCompleted && !isDropped && (
          <button
            className={styleActionBtn({
              variant: "danger",
              disabled: !canDrop,
            })}
            onClick={() => dropM.mutate({ path: { id } })}
            disabled={isAnyPending || !canDrop}
          >
            <XIcon size={12} />
            Drop
          </button>
        )}

        {/* Terminal states */}
        {isCompleted && (
          <span className={styleActionBtn({ variant: "success" })}>
            <CheckCircleIcon size={12} weight="fill" />
            Completed
          </span>
        )}
        {isDropped && (
          <span className={styleActionBtn()}>
            <SquareIcon size={12} />
            Dropped
          </span>
        )}
      </div>
    </div>
  )
}
