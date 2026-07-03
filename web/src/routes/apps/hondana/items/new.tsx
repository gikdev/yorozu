import {
  createContentItemMutation,
  listAllContentItemTagsOptions,
  // listContentItemsOptions,
} from "#/common/api/client"
import { extractErrorMessage } from "#/common/helpers/errors"
import { AppBar } from "#/common/molecules/page-header"
import {
  ContentItemForm,
  type ContentItemFormSubmitHandler,
} from "#/features/content-items/ContentItemForm"
import { contentItemMapper } from "#/features/content-items/contentItemMapper"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  createFileRoute,
  linkOptions,
  useNavigate,
} from "@tanstack/react-router"
import toast from "react-hot-toast"

const TITLE = "New Item"

export const Route = createFileRoute("/apps/hondana/items/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const tagsQ = useQuery(listAllContentItemTagsOptions())
  const createM = useMutation(createContentItemMutation())

  const goUp = () => {
    navigate({ to: "/apps/hondana/items" })
  }

  const handleSubmit: ContentItemFormSubmitHandler = async (values, empty) => {
    const onError = (err: unknown) => toast.error(extractErrorMessage(err))
    const body = contentItemMapper.fromFormValues.toCreateRequest(values)

    await createM.mutateAsync(
      { body },
      {
        onError,
        onSuccess(_data, variables, _onMutateResult, _context) {
          toast.success(`Created the "${variables.body.fullTitle}" item!`)
          empty()
          // TODO:
          // context.client.invalidateQueries(listContentItemsOptions())
        },
      },
    )
  }

  return (
    <div className="h-dvh flex flex-col bg-mist-950 text-mist-400 max-w-120 mx-auto w-full border-x border-mist-900">
      <title>{TITLE}</title>

      <AppBar
        title={TITLE}
        parentPath={linkOptions({ to: "/apps/hondana/items" })}
      />

      <main className="flex-1 flex flex-col p-4">
        <ContentItemForm
          mode="CREATE"
          onCancel={goUp}
          submitLabel="Create New Item"
          onSubmit={handleSubmit}
          allTags={tagsQ.data?.items || []}
        />
      </main>
    </div>
  )
}
