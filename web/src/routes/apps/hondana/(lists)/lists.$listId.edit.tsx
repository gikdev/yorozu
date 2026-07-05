import { SpinnerGapIcon, WarningCircleIcon } from "@phosphor-icons/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"
import {
  getConsumptionTrackListOptions,
  listConsumptionTrackListsOptions,
  updateConsumptionTrackListMutation,
} from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"
import { RenderQuery } from "#/common/helpers/render-query"
import { StateMessage } from "#/common/molecules/StateMessage"
import {
  ConsumptionTrackListForm,
  type ConsumptionTrackListFormSubmitHandler,
} from "#/features/consumption-track-lists/ConsumptionTrackListForm"
import { consumptionTrackListMapper } from "#/features/consumption-track-lists/consumptionTrackListMapper"

export const Route = createFileRoute(
  "/apps/hondana/(lists)/lists/$listId/edit",
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { listId } = Route.useParams()
  const navigate = useNavigate()

  const listQ = useQuery(
    getConsumptionTrackListOptions({ path: { id: listId } }),
  )
  const updateM = useMutation(updateConsumptionTrackListMutation())

  const goBack = () => {
    navigate({ to: "/apps/hondana/lists" })
  }

  const goToDetail = () => {
    navigate({
      to: "/apps/hondana/lists/$listId",
      params: { listId },
    })
  }

  const handleSubmit: ConsumptionTrackListFormSubmitHandler = async (
    values,
    _empty,
  ) => {
    const onError = (err: unknown) => toast.error(extractErrorMessage(err))
    const body =
      consumptionTrackListMapper.fromFormValues.toUpdateRequest(values)

    await updateM.mutateAsync(
      { path: { id: listId }, body },
      {
        onError,
        onSuccess(data, _variables, _onMutateResult, context) {
          toast.success(`Updated "${data.title}"!`)
          context.client.invalidateQueries(listConsumptionTrackListsOptions())
          context.client.invalidateQueries(
            getConsumptionTrackListOptions({
              path: { id: listId },
            }),
          )
          goToDetail()
        },
      },
    )
  }

  return (
    <div className="flex flex-col h-full">
      <RenderQuery
        isList={false}
        status={listQ.status}
        errorView={
          <StateMessage
            mode="ERROR"
            title="Failed to load list"
            description={extractErrorMessage(listQ.error)}
            className="h-full"
            icon={WarningCircleIcon}
          />
        }
        loadingView={
          <StateMessage
            mode="LOADING"
            icon={SpinnerGapIcon}
            title="Loading list..."
            className="h-full"
          />
        }
        successView={() => {
          const initialFormValues =
            // biome-ignore lint/style/noNonNullAssertion: 大丈夫！
            consumptionTrackListMapper.fromResponse.toFormValues(listQ.data!)

          return (
            <ConsumptionTrackListForm
              mode="EDIT"
              initialValues={initialFormValues}
              onCancel={goBack}
              submitLabel="Update List"
              onSubmit={handleSubmit}
            />
          )
        }}
      />
    </div>
  )
}
