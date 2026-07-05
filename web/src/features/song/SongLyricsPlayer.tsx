import { FilePlusIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { btn } from '#/common/atoms/btn'
import { extractErrorMessage } from '#/common/helpers/errors'
import type { TextFieldKey } from '../lyric-lines/LyricLinesForm/LyricLinesFormSchema'
import type { LyricLine } from '../lyric-lines/lyricLineSchema'

const displayFields: { key: TextFieldKey; label: string }[] = [
  { key: 'persian', label: 'Persian' },
  { key: 'english', label: 'English' },
  { key: 'arabic', label: 'Arabic' },
  { key: 'spanish', label: 'Spanish' },
  { key: 'japanese', label: 'Japanese' },
  { key: 'romaji', label: 'Romaji' },
  { key: 'annotation', label: 'Annotation' },
]

interface SongLyricsPlayerProps {
  imageUrl?: string
}

export function SongLyricsPlayer({ imageUrl }: SongLyricsPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const audioBlobRef = useRef<string | null>(null)

  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [lines, setLines] = useState<LyricLine[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentLine = lines.findIndex(
    l => l.timestamp != null && currentTime <= l.timestamp,
  )
  const activeLine =
    currentLine === -1 ? lines[lines.length - 1] : lines[currentLine]

  const handleAudioUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !audioRef.current) return
    if (audioBlobRef.current) URL.revokeObjectURL(audioBlobRef.current)
    audioBlobRef.current = URL.createObjectURL(file)
    setAudioUrl(audioBlobRef.current)
    audioRef.current.src = audioBlobRef.current
    e.target.value = ''
  }

  const handleJsonUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target?.result as string)
        const linesData: LyricLine[] = Array.isArray(parsed)
          ? parsed
          : parsed.lines
        linesData.sort((a, b) => {
          if (a.timestamp === null) return 1
          if (b.timestamp === null) return -1
          return a.timestamp - b.timestamp
        })
        setLines(linesData)
      } catch (err) {
        toast.error(extractErrorMessage(err))
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handlePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  useEffect(() => {
    return () => {
      if (audioBlobRef.current) URL.revokeObjectURL(audioBlobRef.current)
    }
  }, [])

  return (
    <div className='flex flex-col gap-6 w-full mx-auto'>
      {/* Cover image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt='Song cover'
          className='w-full aspect-square object-cover rounded-xl'
        />
      )}

      {/* Current lyric */}
      <div className='flex flex-col gap-2 min-h-32 items-center justify-center text-center px-4'>
        {activeLine ? (
          displayFields.map(({ key }) => {
            const text = activeLine[key]
            if (!text) return null
            return (
              <p
                key={key}
                className={
                  key === activeLine.mainLanguage
                    ? 'text-xl font-semibold text-white'
                    : 'text-sm text-mist-400'
                }
              >
                {text}
              </p>
            )
          })
        ) : (
          <p className='text-mist-500 italic'>—</p>
        )}
      </div>

      {/* Seek bar */}
      <input
        type='range'
        step={0.1}
        value={currentTime}
        max={totalTime}
        disabled={!audioUrl}
        onChange={e => {
          if (!audioRef.current) return
          audioRef.current.currentTime = +e.target.value
        }}
        className='cursor-pointer disabled:cursor-not-allowed accent-sky-500 w-full'
      />

      {/* Controls */}
      <div className='flex items-center justify-center gap-3'>
        <label className={btn({ theme: 'outline' })}>
          <FilePlusIcon size={20} />
          <span>Audio</span>
          <input
            className='hidden'
            type='file'
            accept='audio/*'
            onChange={handleAudioUpload}
          />
        </label>

        <button
          disabled={!audioUrl}
          className={btn({ theme: 'primary', size: 'lg' })}
          onClick={handlePlayPause}
          type='button'
        >
          {isPlaying ? (
            <PauseIcon size={32} weight='fill' />
          ) : (
            <PlayIcon size={32} weight='fill' />
          )}
        </button>

        <label className={btn({ theme: 'outline' })}>
          <FilePlusIcon size={20} />
          <span>Lyrics</span>
          <input
            className='hidden'
            type='file'
            accept='.json'
            onChange={handleJsonUpload}
          />
        </label>
      </div>

      {/** biome-ignore lint/a11y/useMediaCaption: いいんだよ！ */}
      <audio
        ref={audioRef}
        onLoadedMetadata={e => setTotalTime(e.currentTarget.duration)}
        onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  )
}
