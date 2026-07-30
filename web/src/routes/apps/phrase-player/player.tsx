import { UploadSimpleIcon } from '@phosphor-icons/react'
import { createFileRoute, linkOptions } from '@tanstack/react-router'
import { useSelector } from '@tanstack/react-store'
import { useEffect, useMemo, useRef, useState } from 'react'
import { btn } from '#/common/atoms/btn'
import { AppBar } from '#/common/molecules/page-header'
import { Piece } from '#/features/phrase-player/pieces'
import { SongTimeline } from '#/features/phrase-player/SongTimeline'
import {
  songPlayerStore,
  TimestampSongPlayer,
} from '#/features/phrase-player/timestamp-song-player'

export const Route = createFileRoute('/apps/phrase-player/player')({
  component: PlayerPage,
})

function PlayerPage() {
  const [songName, setSongName] = useState('')
  const [pieces, setPieces] = useState<Piece[]>([])
  const currentTime = useSelector(songPlayerStore, s => s.currentTime)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const activeWordRef = useRef<HTMLSpanElement>(null)

  // Build lines from pieces (memoized)
  const lines = useMemo(() => SongTimeline.buildLines(pieces), [pieces])

  // Determine current position in the song
  const { currentLine, currentWordIndex } = useMemo(
    () => SongTimeline.getCurrentPosition(lines, currentTime),
    [lines, currentTime],
  )

  // Auto-scroll to the active word
  useEffect(() => {
    if (activeWordRef.current) {
      activeWordRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [currentLine, currentWordIndex])

  // Load JSON file and create Piece instances
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = event => {
      try {
        const json = JSON.parse(event.target?.result as string)
        if (typeof json.songName !== 'string' || !Array.isArray(json.pieces)) {
          alert('Invalid file format.')
          return
        }

        const loadedPieces = json.pieces.map(
          (p: any) =>
            new Piece({
              id: p.id,
              text: p.text,
              isFirstWord: p.isFirstWord ?? false,
              timestamp: p.timestamp ?? null,
            }),
        )

        setPieces(loadedPieces)
        setSongName(json.songName || '')
      } catch {
        alert('Could not parse the file.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400'>
      <AppBar
        title={songName || 'Phrase Player'}
        parentPath={linkOptions({ to: '/apps/phrase-player' })}
      >
        <button
          type='button'
          className={btn({ isIcon: true })}
          onClick={() => fileInputRef.current?.click()}
          title='Load song JSON'
        >
          <UploadSimpleIcon size={20} />
        </button>
        <input
          ref={fileInputRef}
          type='file'
          accept='.json'
          className='hidden'
          onChange={handleFileSelect}
        />
      </AppBar>

      <main className='flex-1 flex flex-col overflow-hidden min-h-0'>
        <TimestampSongPlayer />

        {pieces.length === 0 ? (
          <div className='flex-1 flex items-center justify-center text-mist-600'>
            Load a song JSON to start
          </div>
        ) : (
          <div className='flex-1 flex items-center justify-center p-6 overflow-hidden'>
            <div className='flex flex-wrap justify-center gap-x-2 gap-y-1 text-3xl leading-relaxed transition-all duration-300'>
              {currentLine?.pieces
                .slice(0, currentWordIndex + 1)
                .map((piece, idx) => {
                  const isActive = idx === currentWordIndex

                  return (
                    <span
                      key={piece.id}
                      ref={isActive ? activeWordRef : null}
                      className={`
                      transition-all duration-200
                      ${isActive ? 'text-white font-bold' : 'text-mist-300'}
                    `}
                      // dangerouslySetInnerHTML={{ __html: piece.text }}
                    >
                      {piece.text}
                    </span>
                  )
                })}
              {(!currentLine || currentWordIndex === -1) && (
                <span className='text-mist-600 italic'>...</span>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
