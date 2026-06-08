import { Link } from "@tanstack/react-router"
import { MusicNoteIcon, UserIcon, CaretRightIcon } from "@phosphor-icons/react"
import type { LyricSong } from "./LyricSong"
import { LanguageTag } from "./LanguageTag"

interface SongCardProps {
  song: LyricSong
  to: string
}

export const SongCard = (p: SongCardProps) => (
  <Link to={p.to}>
    <div className="group block bg-white dark:bg-mist-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-mist-100 dark:border-mist-700 overflow-hidden hover:-translate-y-0.5">
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400">
              <MusicNoteIcon size={20} weight="duotone" />
            </div>
            <h3 className="font-serif text-xl font-medium text-mist-900 dark:text-white tracking-tight">
              {p.song.title}
            </h3>
          </div>
          <CaretRightIcon
            size={18}
            weight="bold"
            className="text-mist-400 group-hover:text-sky-500 transition-colors"
          />
        </div>

        {/* Artist */}
        <div className="mt-3 flex items-center gap-1.5 text-sm text-mist-500 dark:text-mist-400">
          <UserIcon size={14} weight="regular" />
          <span>{p.song.artist || "Unknown artist"}</span>
        </div>

        {/* Language tag */}
        <div className="mt-4">
          <LanguageTag language={p.song.defaultPrimaryLanguage} />
        </div>
      </div>
    </div>
  </Link>
)
