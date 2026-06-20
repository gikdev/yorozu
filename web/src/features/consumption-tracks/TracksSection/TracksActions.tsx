import {
  createTrackEndpointMutation,
  listTracksForContentItemEndpointQueryKey,
  startTrackEndpointMutation,
  updateTrackProgressEndpointMutation,
} from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { extractErrorMessage } from "#/common/helpers/errors"
import { PlusIcon } from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import toast from "react-hot-toast"

const onError = (err: unknown) => toast.error(extractErrorMessage(err))

interface TracksActionsProps {
  id: string
}

export function TracksActions({ id }: TracksActionsProps) {
  const queryClient = useQueryClient()

  const invalidateTracks = () => {
    queryClient.invalidateQueries({
      queryKey: listTracksForContentItemEndpointQueryKey({
        path: { id },
      }),
    })
  }

  const createM = useMutation({
    ...createTrackEndpointMutation(),
    onSuccess: invalidateTracks,
    onError,
  })

  const startM = useMutation({
    ...startTrackEndpointMutation(),
    onSuccess: invalidateTracks,
    onError,
  })

  const progressM = useMutation({
    ...updateTrackProgressEndpointMutation(),
    onSuccess: invalidateTracks,
    onError,
  })

  /**
   * Reusable quick action handler.
   * @param type - "Fun" or "Edu"
   * @param isDoing - true for "Doing" (in progress), false for "Done" (completed)
   */
  const quickAction = async (type: "Fun" | "Education", isDoing: boolean) => {
    const isConfirmed = window.confirm("Sure?")
    if (!isConfirmed) return

    const title = window.prompt("Title?", "First")
    if (!title?.trim()) {
      toast.error("Cancelled")
      return
    }

    try {
      // 1. Create the track
      const track = await createM.mutateAsync({
        body: { title, type },
        path: { contentItemId: id },
      })

      // 2. Start the track (required before progress)
      await startM.mutateAsync({
        path: { id: track.id },
      })

      if (isDoing) {
        // Doing: ask how many units already consumed and increment by that amount
        const amountInput = window.prompt(
          `How many ${track.unitType || "units"} already?`,
          "0",
        )
        const amount = Number(amountInput)
        if (isNaN(amount) || amount < 0) {
          toast.error("Invalid number")
          return
        }

        await progressM.mutateAsync({
          body: { action: "Increment", amount },
          path: { id: track.id },
        })

        if (amount >= (track.totalUnits ?? 0)) {
          toast.success(`"${title}" completed!`)
        } else {
          toast.success(`"${title}" started`)
        }
      } else {
        // Done: increment by total units to auto-complete the track
        const total = track.totalUnits ?? 0
        const updatedTrack = await progressM.mutateAsync({
          body: { action: "Increment", amount: total },
          path: { id: track.id },
        })

        if (updatedTrack.status === "Completed") {
          toast.success(`"${title}" done!`)
        } else {
          toast.error("Couldn't auto-complete track.")
        }
      }
    } catch (err) {
      onError(err)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Link
        to="/apps/hondana/library/$id/tracks/new"
        className={btn({ theme: "primary" })}
        params={{ id }}
      >
        <PlusIcon size={24} />
        <span>Create new track</span>
      </Link>

      <div className="flex flex-wrap gap-2 items-center">
        <button
          className={btn({ size: "sm" })}
          onClick={() => quickAction("Fun", false)}
        >
          Fun:Done
        </button>
        <button
          className={btn({ size: "sm" })}
          onClick={() => quickAction("Fun", true)}
        >
          Fun:Doing
        </button>
        <button
          className={btn({ size: "sm" })}
          onClick={() => quickAction("Education", false)}
        >
          Edu:Done
        </button>
        <button
          className={btn({ size: "sm" })}
          onClick={() => quickAction("Education", true)}
        >
          Edu:Doing
        </button>
      </div>
    </div>
  )
}
