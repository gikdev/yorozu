import { useState } from "react"
import type { LyricSong } from "./LyricSong"
import { LanguageToggle } from "./LanguageToggle"
import { LyricLine } from "./LyricLine"

interface SongDetailProps {
  song: LyricSong
}

export type EnabledLanguages = {
  ja: boolean
  romaji: boolean
  en: boolean
  fa: boolean
}

export const SongDetail = ({ song }: SongDetailProps) => {
  const [enabled, setEnabled] = useState<EnabledLanguages>({
    ja: true,
    romaji: false,
    en: true,
    fa: false,
  })

  const toggleLanguage = (lang: keyof EnabledLanguages) => {
    setEnabled(prev => ({ ...prev, [lang]: !prev[lang] }))
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-mist-200 dark:border-mist-700 pb-6 flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-medium text-mist-900 dark:text-white tracking-tight">
          {song.title}
        </h1>

        <p className="text-mist-500 dark:text-mist-400 text-lg">
          {song.artist}
          {" • "}
          <a
            href={song.animeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:underline"
          >
            {song.animeTitle}
          </a>
        </p>
      </div>

      {/* Audio player */}
      {song.audioUrl && (
        <audio src={song.audioUrl} controls className="w-full" />
      )}

      {/* Language toggles */}
      <div className="flex flex-wrap gap-3">
        <LanguageToggle
          lang="ja"
          label="日本語"
          enabled={enabled.ja}
          onToggle={() => toggleLanguage("ja")}
        />
        <LanguageToggle
          lang="romaji"
          label="Romaji"
          enabled={enabled.romaji}
          onToggle={() => toggleLanguage("romaji")}
        />
        <LanguageToggle
          lang="en"
          label="English"
          enabled={enabled.en}
          onToggle={() => toggleLanguage("en")}
        />
        <LanguageToggle
          lang="fa"
          label="فارسی"
          enabled={enabled.fa}
          onToggle={() => toggleLanguage("fa")}
        />
      </div>

      {/* Lyrics */}
      <div className="flex flex-col gap-4">
        {song.lines.map((line, idx) => (
          <LyricLine
            key={idx}
            line={line}
            enabled={enabled}
            defaultPrimaryLanguage={song.defaultPrimaryLanguage}
          />
        ))}
      </div>
    </div>
  )
}
