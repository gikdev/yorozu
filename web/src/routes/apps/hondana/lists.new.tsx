import {
  createConsumptionTrackListMutation,
  listConsumptionTrackListsQueryKey,
} from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"
import {
  ConsumptionTrackListForm,
  type ConsumptionTrackListFormSubmitHandler,
} from "#/features/consumption-track-lists/ConsumptionTrackListForm"
import { consumptionTrackListMapper } from "#/features/consumption-track-lists/consumptionTrackListMapper"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import toast from "react-hot-toast"

export const Route = createFileRoute("/apps/hondana/lists/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const createM = useMutation(createConsumptionTrackListMutation())

  const goUp = () => {
    navigate({ to: "/apps/hondana/lists" })
  }

  const handleSubmit: ConsumptionTrackListFormSubmitHandler = async (
    values,
    empty,
  ) => {
    const onError = (err: unknown) => toast.error(extractErrorMessage(err))
    const body =
      consumptionTrackListMapper.fromFormValues.toCreateRequest(values)

    await createM.mutateAsync(
      { body },
      {
        onError,
        onSuccess(data, _variables, _onMutateResult, context) {
          toast.success(`Created the "${data.title}" list!`)
          empty()
          context.client.invalidateQueries({
            queryKey: listConsumptionTrackListsQueryKey(),
          })
        },
      },
    )
  }

  return (
    <div>
      <ConsumptionTrackListForm
        mode="CREATE"
        onCancel={goUp}
        submitLabel="Create New List"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
