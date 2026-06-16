import {
  LocationType,
  type LocationRto,
  doQuickActionsMutation,
  deleteContentItemMutation,
  type DoQuickActionsRequest,
  getContentItemOptions,
  type ContentItemResponse,
} from "#/common/api/client"
import { btn } from "#/common/atoms/btn"
import { extractErrorMessage } from "#/common/helpers/errors"
import {
  BookmarkSimpleIcon,
  LockSimpleIcon,
  HeartIcon,
  PencilSimpleIcon,
  TrashSimpleIcon,
  ArrowSquareOutIcon,
  SpinnerGapIcon,
} from "@phosphor-icons/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link, useNavigate } from "@tanstack/react-router"
import type { ReactNode } from "react"
import toast from "react-hot-toast"
import { tv } from "tailwind-variants"

const styleActionRow = tv({ base: "flex flex-col items-center" })
const onError = (err: unknown) => toast.error(extractErrorMessage(err))

interface ActionBarProps {
  isBookmarked: boolean
  isSecret: boolean
  isFavorite: boolean
  id: string
  location: LocationRto | null
}

export function ActionBar(p: ActionBarProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const doQuickActionsM = useMutation(doQuickActionsMutation())
  const deleteContentItemM = useMutation(deleteContentItemMutation())

  const path = { id: p.id }
  const locationUrl =
    p.location?.type === LocationType.URL ? p.location?.value : null

  const onSuccess = (data: ContentItemResponse) => {
    queryClient.setQueryData(getContentItemOptions({ path }).queryKey, data)
  }

  const handleBookmarkToggle = () => {
    const body: DoQuickActionsRequest = {
      isBookmarked: p.isBookmarked ? "Off" : "On",
    }

    doQuickActionsM.mutate({ path, body }, { onError, onSuccess })
  }

  const handleFavoriteToggle = () => {
    const body: DoQuickActionsRequest = {
      isFavorite: p.isFavorite ? "Off" : "On",
    }

    doQuickActionsM.mutate({ path, body }, { onError, onSuccess })
  }

  const handleSecretToggle = () => {
    const body: DoQuickActionsRequest = {
      isSecret: p.isSecret ? "Off" : "On",
    }

    doQuickActionsM.mutate({ path, body }, { onError, onSuccess })
  }

  const handleTrashBtn = () => {
    const isConfirmed = window.confirm("Are u sure?")
    if (!isConfirmed) return

    const onSuccess = () => navigate({ to: "/apps/hondana/library" })

    deleteContentItemM.mutate({ path }, { onError, onSuccess })
  }

  return (
    <div className={styleActionRow()}>
      <ActionBtn
        isLoading={doQuickActionsM.isPending}
        onClick={handleBookmarkToggle}
      >
        <BookmarkSimpleIcon
          size={24}
          weight={p.isBookmarked ? "fill" : "regular"}
          className={p.isBookmarked ? "text-yellow-500" : ""}
        />
      </ActionBtn>

      <ActionBtn
        isLoading={doQuickActionsM.isPending}
        onClick={handleSecretToggle}
      >
        <LockSimpleIcon
          size={24}
          weight={p.isSecret ? "fill" : "regular"}
          className={p.isSecret ? "text-purple-500" : ""}
        />
      </ActionBtn>

      <ActionBtn
        isLoading={doQuickActionsM.isPending}
        onClick={handleFavoriteToggle}
      >
        <HeartIcon
          size={24}
          weight={p.isFavorite ? "fill" : "regular"}
          className={p.isFavorite ? "text-rose-500" : ""}
        />
      </ActionBtn>

      <Link
        to="/apps/hondana/library/$id/edit"
        params={{ id: p.id }}
        className={btn({ isIcon: true, className: "rounded-none" })}
      >
        <PencilSimpleIcon size={24} />
      </Link>

      <ActionBtn
        isLoading={deleteContentItemM.isPending}
        onClick={handleTrashBtn}
      >
        <TrashSimpleIcon size={24} />
      </ActionBtn>

      {locationUrl && (
        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={btn({ isIcon: true, className: "rounded-none" })}
        >
          <ArrowSquareOutIcon size={24} />
        </a>
      )}
    </div>
  )
}

const ActionBtn = (p: {
  isLoading: boolean
  children: ReactNode
  onClick: () => void
}) => (
  <button
    className={btn({ isIcon: true, className: "rounded-none" })}
    disabled={p.isLoading}
    onClick={p.onClick}
  >
    {p.isLoading ? (
      <SpinnerGapIcon size={24} className="animate-spin" />
    ) : (
      p.children
    )}
  </button>
)
