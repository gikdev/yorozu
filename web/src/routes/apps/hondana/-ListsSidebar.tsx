import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import {
  InfoIcon,
  ListPlusIcon,
  PencilSimpleIcon,
  SpinnerGapIcon,
  TrashSimpleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react"
import { btn } from "#/common/atoms/btn"
import { RenderQuery } from "#/common/helpers/render-query"
import { listConsumptionTrackListsOptions } from "#/common/api/client"
import { StateMessage } from "#/common/molecules/StateMessage"
import { extractErrorMessage } from "#/common/helpers/errors"

export function ListsSidebar() {
  const navigate = useNavigate({ from: "/apps/hondana/lists" })
  const listsQ = useQuery(listConsumptionTrackListsOptions())

  return (
    <RenderQuery
      isList={true}
      status={listsQ.status}
      listCount={listsQ.data?.items.length ?? 0}
      errorView={
        <StateMessage
          icon={WarningCircleIcon}
          title="Failed to load lists"
          description={extractErrorMessage(listsQ.error)}
          mode="ERROR"
          retry={listsQ.refetch}
        />
      }
      loadingView={
        <StateMessage
          mode="LOADING"
          icon={SpinnerGapIcon}
          title="Loading lists..."
        />
      }
      emptyView={
        <StateMessage
          mode="NORMAL"
          className="h-full"
          icon={ListPlusIcon}
          title="No lists yet"
          description="Create your first list!"
        />
      }
      fullView={() => (
        listsQ.data!.items.map((list) => (
          <ListItemCard
            key={list.id}
            title={list.title}
            onDetails={() =>
              navigate({
                to: "/apps/hondana/lists/$listId",
                params: { listId: list.id },
              })
            }
            onEdit={() =>
              navigate({
                to: "/apps/hondana/lists/$listId/edit",
                params: { listId: list.id },
              })
            }
            onDelete={() => {
              const confirmed = window.confirm(
                `Delete "${list.title}"? (Not implemented)`
              )
              if (confirmed) window.alert("Not implemented yet.")
            }}
          />
        ))
      )}
    />
  )
}

const ListItemCard = (p: {
  title: string
  onDetails: () => void
  onEdit: () => void
  onDelete: () => void
}) => (
  <div className="flex items-center">
    <button
      type="button"
      className={btn({ class: "rounded-none w-full justify-start" })}
    >
      <span className="truncate">{p.title}</span>
    </button>

    <button
      type="button"
      onClick={p.onDetails}
      className={btn({ class: "rounded-none shrink-0", isIcon: true })}
    >
      <InfoIcon size={20} />
    </button>

    <button
      type="button"
      onClick={p.onEdit}
      className={btn({ class: "rounded-none shrink-0", isIcon: true })}
    >
      <PencilSimpleIcon size={20} />
    </button>

    <button
      type="button"
      onClick={p.onDelete}
      className={btn({ class: "rounded-none shrink-0", isIcon: true })}
    >
      <TrashSimpleIcon size={20} />
    </button>
  </div>
)
