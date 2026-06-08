import { createContentItemMutation } from "#/common/api/client"
import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { useEffect } from "react"

export const Route = createFileRoute("/apps/hondana/library/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const mut = useMutation(createContentItemMutation())

  useEffect(() => {
    mut.mutate(
      {
        body: {
          format: "Watchable",
          fullTitle:
            "Ascendance of a Bookworm S4: Adopted Daughter of an Archduke",
          coverImagePath:
            "https://animegate.ir/storage/anime/images/2024/10/1a69f7eb-c9a4-491a-98ad-3fc9882c77aa.webp",
          genres: ["Fantasy", "Isekai", "Reincarnation", "SliceOfLife"],
          isBookmarked: true,
          isFavorite: true,
          isSecret: false,
          location: {
            type: "Url",
            value: "https://animegate.ir/anime/ascendance-of-a-bookworm-20751",
          },
          nickName: "本好き S4",
          tags: ["books", "anime"],
          unitSpec: {
            isOngoing: true,
            unitType: "Episode",
            totalUnits: null,
          },
        },
      },
      {
        onSettled(data, error, variables, onMutateResult, context) {
          console.log({ data, error, variables })
        },
      },
    )
  }, [])

  return (
    <AppShell>
      <PageHeader
        title="New Content Item"
        left={
          <PageHeaderBackButton
            to={linkOptions({ to: "/apps/hondana/library" }).to}
          />
        }
      />

      <main className="flex-1 p-4 overflow-y-auto min-h-0 flex flex-col">
        lkajsdflkjasdlfk
      </main>
    </AppShell>
  )
}
