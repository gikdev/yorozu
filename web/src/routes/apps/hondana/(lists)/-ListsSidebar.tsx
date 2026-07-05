import {
  InfoIcon,
  ListPlusIcon,
  PencilSimpleIcon,
  SpinnerGapIcon,
  TrashSimpleIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import toast from 'react-hot-toast'
import {
  type ConsumptionTrackListMiniResponse,
  ConsumptionTrackLists,
  listConsumptionTrackListsOptions,
} from '#/common/api/client'
import { btn } from '#/common/atoms/btn'
import { extractErrorMessage } from '#/common/helpers/errors'
import { RenderQuery } from '#/common/helpers/render-query'
import { StateMessage } from '#/common/molecules/StateMessage'

export function ListsSidebar() {
  const navigate = useNavigate({ from: '/apps/hondana/lists' })
  const listsQ = useQuery(listConsumptionTrackListsOptions())
  const queryClient = useQueryClient()

  const handleDelete = async (list: ConsumptionTrackListMiniResponse) => {
    const confirmed = window.confirm(`Delete "${list.title}"?`)
    if (!confirmed) return

    const promise = ConsumptionTrackLists.deleteConsumptionTrackList({
      path: { id: list.id },
    })
    const success = () => {
      queryClient.invalidateQueries(listConsumptionTrackListsOptions())

      return `Deleted "${list.title}"!`
    }

    await toast.promise(promise, {
      loading: `Deleting "${list.title}"...`,
      error: extractErrorMessage,
      success,
    })
  }

  return (
    <RenderQuery
      isList={true}
      status={listsQ.status}
      listCount={listsQ.data?.items.length ?? 0}
      errorView={
        <StateMessage
          icon={WarningCircleIcon}
          title='Failed to load lists'
          className='h-full'
          description={extractErrorMessage(listsQ.error)}
          mode='ERROR'
          retry={listsQ.refetch}
        />
      }
      loadingView={
        <StateMessage
          mode='LOADING'
          className='h-full'
          icon={SpinnerGapIcon}
          title='Please wait.'
          description='Loading lists...'
        />
      }
      emptyView={
        <StateMessage
          mode='NORMAL'
          className='h-full'
          icon={ListPlusIcon}
          title='No lists yet'
          description='Create your first list!'
        />
      }
      fullView={() =>
        listsQ.data?.items.map(list => (
          <ListItemCard
            disabled={false}
            key={list.id}
            title={list.title}
            onDetails={() =>
              navigate({
                to: '/apps/hondana/lists/$listId',
                params: { listId: list.id },
              })
            }
            onEdit={() =>
              navigate({
                to: '/apps/hondana/lists/$listId/edit',
                params: { listId: list.id },
              })
            }
            onDelete={() => handleDelete(list)}
          />
        ))
      }
    />
  )
}

const ListItemCard = (p: {
  title: string
  onDetails: () => void
  onEdit: () => void
  onDelete: () => void
  disabled: boolean
}) => (
  <div className='flex items-center'>
    <button
      disabled={p.disabled}
      type='button'
      className={btn({ class: 'rounded-none w-full justify-start' })}
    >
      <span className='truncate'>{p.title}</span>
    </button>

    <button
      type='button'
      disabled={p.disabled}
      onClick={p.onDetails}
      className={btn({ class: 'rounded-none shrink-0', isIcon: true })}
    >
      <InfoIcon size={20} />
    </button>

    <button
      type='button'
      disabled={p.disabled}
      onClick={p.onEdit}
      className={btn({ class: 'rounded-none shrink-0', isIcon: true })}
    >
      <PencilSimpleIcon size={20} />
    </button>

    <button
      type='button'
      disabled={p.disabled}
      onClick={p.onDelete}
      className={btn({ class: 'rounded-none shrink-0', isIcon: true })}
    >
      <TrashSimpleIcon size={20} />
    </button>
  </div>
)
