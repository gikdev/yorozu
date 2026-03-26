import { createFileRoute } from "@tanstack/react-router"
import { Header } from "./-header"
import { listTodosOptions } from "#/common/api/client"
import { useQuery } from "@tanstack/react-query"
import { RenderQuery } from "#/common/helpers/render-query"
import { ErrorCard } from "#/common/helpers/error-card"
import { ClipboardTextIcon, SpinnerIcon } from "@phosphor-icons/react"
import { en } from "#/common/i18n/en"

export const Route = createFileRoute("/apps/todos/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  const listTodosQ = useQuery(listTodosOptions())

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col">
        <RenderQuery
          isList={true}
          status={listTodosQ.status}
          listCount={listTodosQ.data?.items.length!}
          errorView={<ErrorCard message={listTodosQ.error?.message} onRetry={listTodosQ.refetch} />}
          loadingView={<LoadingTodosList />}
          emptyView={<EmtpyTodosList />}
          fullView={listTodosQ.data?.items.map((t) => (
            <p key={t.id}>{t.title}</p>
          ))}
        />
      </div>
    </div>
  )
}

function EmtpyTodosList() {
  return (
    <div className="flex flex-col items-center justify-center py-8 flex-1 text-mist-400 gap-2">
      <ClipboardTextIcon size={40} />
      <p>{en.todos.empty}</p>
    </div>
  )
}

function LoadingTodosList() {
  return (
    <div className="flex flex-col items-center justify-center py-8 flex-1 text-mist-400 gap-2">
      <SpinnerIcon size={40} className="animate-spin" />
      <p>{en.todos.loading}</p>
    </div>
  )
}
