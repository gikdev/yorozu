import { createFileRoute } from "@tanstack/react-router"
import { Header } from "./-header"
import { listTodosOptions } from "#/common/api/client"
import { useQuery } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { RenderQuery } from "#/common/helpers/render-query"

export const Route = createFileRoute("/apps/todos/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  const listTodosQ = useQuery(listTodosOptions())

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <Header />

      <div className="flex-1">
        <RenderQuery
          isList={true}
          status={listTodosQ.status}
          errorView={<p>Sth went wrong.</p>}
          loadingView={<p>Loading...</p>}
          listCount={listTodosQ.data!.items.length}
          emptyView={<p>No todos...</p>}
          fullView={listTodosQ.data?.items.map((t) => (
            <p key={t.id}>{t.title}</p>
          ))}
        />
      </div>
    </div>
  )
}
