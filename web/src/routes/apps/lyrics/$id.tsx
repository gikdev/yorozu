import {
  createFileRoute,
  Link,
  linkOptions,
  notFound,
} from "@tanstack/react-router"
import { AppShell } from "#/common/molecules/AppShell"
import {
  PageHeader,
  PageHeaderBackButton,
} from "#/common/molecules/page-header"
import { myFavLyricSongs } from "#/features/lyrics/myFavLyrics"
import { SongDetail } from "#/features/lyrics/SongDetails"
import { PrinterIcon } from "@phosphor-icons/react"

export const Route = createFileRoute("/apps/lyrics/$id")({
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
  loader: ({ params }) => {
    const song = myFavLyricSongs.find(s => s.id === params.id)

    if (!song) {
      throw notFound()
    }

    return { song }
  },
})

function RouteComponent() {
  const { song } = Route.useLoaderData()

  return (
    <AppShell>
      <PageHeader
        right={
          <Link
            to="/apps/lyrics/print/$id"
            params={{ id: song.id }}
            target="_blank"
            className="min-h-12 aspect-square flex items-center justify-center transition-colors rounded-full hover:bg-mist-800 hover:text-mist-100"
          >
            <PrinterIcon size={18} />
          </Link>
        }
        title="Lyrics"
        left={
          <PageHeaderBackButton to={linkOptions({ to: "/apps/lyrics" }).to} />
        }
      />

      <main className="flex-1 overflow-y-auto min-h-0">
        <SongDetail song={song} />
      </main>
    </AppShell>
  )
}

function NotFoundComponent() {
  return (
    <AppShell>
      <PageHeader
        title="Lyrics"
        left={
          <PageHeaderBackButton to={linkOptions({ to: "/apps/lyrics" }).to} />
        }
      />

      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-2xl font-medium text-mist-900 dark:text-white mb-2">
          Song not found
        </h2>
        <p className="text-mist-500 dark:text-mist-400">
          The song you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </AppShell>
  )
}
