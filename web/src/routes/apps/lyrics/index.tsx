import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { myFavLyricSongs } from "#/features/lyrics/myFavLyrics"
import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { SongCard } from "#/features/lyrics/SongCard"

export const Route = createFileRoute("/apps/lyrics/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AppShell>
      <title>Lyrics</title>

      <PageHeader
        title="Lyrics"
        left={<PageHeaderBackButton to={linkOptions({ to: "/apps" }).to} />}
      />

      <main className="flex-1 overflow-y-auto min-h-0 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myFavLyricSongs.map(song => (
            <SongCard
              key={song.id}
              song={song}
              to={
                linkOptions({ to: "/apps/lyrics/$id", params: { id: song.id } })
                  .params.id
              }
            />
          ))}
        </div>
      </main>
    </AppShell>
  )
}
