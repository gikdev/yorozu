import { createFileRoute, notFound } from "@tanstack/react-router"
import { myFavLyricSongs } from "#/features/lyrics/myFavLyrics"
import { LyricLinePrint } from "#/features/lyrics/LyricLinePrint"

export const Route = createFileRoute("/apps/lyrics/print/$id")({
  component: RouteComponent,
  loader: ({ params }) => {
    const song = myFavLyricSongs.find(s => s.id === params.id)
    if (!song) throw notFound()
    return { song }
  },
})

function RouteComponent() {
  const { song } = Route.useLoaderData()

  // All languages enabled for print (show everything)
  const enabledAll = {
    ja: true,
    romaji: true,
    en: true,
    fa: true,
  }

  return (
    <div className="min-h-screen bg-black text-white print:bg-white print:text-black">
      <title>Print - Lyrics</title>

      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-gray-700 print:border-gray-300">
          <h1 className="text-5xl font-serif font-bold mb-2">{song.title}</h1>
          <p className="text-2xl text-gray-300 print:text-gray-600">
            {song.artist}
          </p>
        </div>

        {/* Audio not needed in print, but keep metadata maybe optional */}
        {/* Lyrics */}
        <div className="space-y-6">
          {song.lines.map((line, idx) => (
            <LyricLinePrint
              key={idx}
              line={line}
              enabled={enabledAll}
              defaultPrimaryLanguage={song.defaultPrimaryLanguage}
            />
          ))}
        </div>

        {/* Print hint (only visible on screen, not print) */}
        <div className="mt-12 text-gray-500 text-sm print:hidden">
          Press Ctrl+P to print this page
        </div>
      </div>
    </div>
  )
}
