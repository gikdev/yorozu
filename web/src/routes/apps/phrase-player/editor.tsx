import {
  ArrowDownIcon,
  ArrowUpIcon,
  DownloadSimpleIcon,
  TextboxIcon,
  UploadSimpleIcon,
} from '@phosphor-icons/react'
import { createFileRoute, linkOptions } from '@tanstack/react-router'
import { useSelector } from '@tanstack/react-store'
import { useEffect, useMemo, useRef, useState } from 'react'
import { btn } from '#/common/atoms/btn'
import { styleInput } from '#/common/atoms/input'
import { AppBar } from '#/common/molecules/page-header'
import { Piece, Pieces } from '#/features/phrase-player/pieces'
import {
  songPlayerStore,
  TimestampSongPlayer,
} from '#/features/phrase-player/timestamp-song-player'

const TITLE = 'Phrase Player - Editor'

export const Route = createFileRoute('/apps/phrase-player/editor')({
  component: RouteComponent,
})

function RouteComponent() {
  const [rawText, setRawText] = useState('')
  const [pieces, setPieces] = useState<Piece[]>([])
  const [songName, setSongName] = useState('Phrase Player - Editor')
  const currentTime = useSelector(songPlayerStore, s => s.currentTime)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const piecesWithoutTimestamp = useMemo(
    () => pieces.filter(p => p.timestamp === null),
    [pieces],
  )
  const piecesWithTimestamp = useMemo(
    () =>
      pieces
        .filter(p => p.timestamp !== null)
        .toSorted((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0)),
    [pieces],
  )

  const changeSongName = () => {
    const answer = window.prompt("Enter song name:", songName)
    setSongName(answer || TITLE)
  }

  const handleToPieces = () => {
    setPieces(Pieces.fromRawText(rawText))
  }

  const handleToRawText = () => {
    let finalText = ''

    for (const piece of pieces) {
      finalText = finalText += piece.isFirstWord
        ? `
${piece.text}`
        : piece.text
      finalText = finalText += ';'
    }

    finalText = finalText.trim()

    setRawText(finalText)
  }

  const handleAddTimestamp = (piece: Piece) => {
    const updated = Piece.setTimestamp(piece, currentTime)
    setPieces(prev => prev.map(p => (p.id === piece.id ? updated : p)))
  }

  const handleRemoveTimestamp = (piece: Piece) => {
    const updated = Piece.removeTimestamp(piece)
    setPieces(prev => prev.map(p => (p.id === piece.id ? updated : p)))
  }

  const handleDownload = () => {
    const data = {
      songName: songName || 'untitled',
      pieces: pieces.map(p => ({
        id: p.id,
        text: p.text,
        isFirstWord: p.isFirstWord,
        timestamp: p.timestamp,
      })),
    }

    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${data.songName}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = event => {
      try {
        const json = JSON.parse(event.target?.result as string)
        // Validate structure
        if (typeof json.songName !== 'string' || !Array.isArray(json.pieces)) {
          alert('Invalid file format.')
          return
        }

        // Map to Piece instances
        const loadedPieces: Piece[] = json.pieces.map(
          (p: Piece) =>
            new Piece({
              id: p.id,
              text: p.text,
              isFirstWord: p.isFirstWord ?? false,
              timestamp: p.timestamp ?? null,
            }),
        )

        setPieces(loadedPieces)
        setSongName(json.songName || '')
        handleToRawText()
      } catch {
        alert('Could not parse the file.')
      }
    }
    reader.readAsText(file)

    // Reset input so the same file can be re-selected if needed
    e.target.value = ''
  }

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [])

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400'>
      <AppBar
        title={songName}
        parentPath={linkOptions({ to: '/apps/phrase-player' })}
      >
        <button
          type='button'
          className={btn({ isIcon: true, class: 'rounded-none' })}
          onClick={changeSongName}
          title='Change Song Name'
        >
          <TextboxIcon size={24} />
        </button>

        <button
          type='button'
          className={btn({ isIcon: true, class: 'rounded-none' })}
          onClick={handleDownload}
          title='Download JSON'
        >
          <DownloadSimpleIcon size={24} />
        </button>

        <button
          type='button'
          className={btn({ isIcon: true, class: 'rounded-none' })}
          onClick={() => fileInputRef.current?.click()}
          title='Upload JSON'
        >
          <UploadSimpleIcon size={24} />
        </button>

        <input
          ref={fileInputRef}
          type='file'
          accept='.json'
          className='hidden'
          onChange={handleFileSelect}
        />
      </AppBar>

      <main className='flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0'>
        <TimestampSongPlayer />

        <div className='flex gap-2 min-h-min h-max'>
          {/* Left: pieces without timestamp */}
          <div className='flex-1 border-2 border-mist-900 rounded-md p-2 flex flex-wrap gap-1 items-start h-max self-stretch'>
            {piecesWithoutTimestamp.map(piece => (
              <PieceButton
                key={piece.id}
                piece={piece}
                onClick={() => handleAddTimestamp(piece)}
                showTimestamp={false}
              />
            ))}
          </div>

          <hr className='w-0.5 bg-mist-900 border-none rounded-md self-stretch' />

          {/* Right: pieces with timestamp */}
          <div className='flex-1 border-2 border-mist-900 rounded-md p-2 flex flex-wrap gap-1 items-start h-max self-stretch'>
            {piecesWithTimestamp.map(piece => (
              <PieceButton
                key={piece.id}
                piece={piece}
                onClick={() => handleRemoveTimestamp(piece)}
                showTimestamp={true}
              />
            ))}
          </div>
        </div>

        <div className='flex *:flex-1 gap-2'>
          <button
            type='button'
            className={btn({ theme: 'primary' })}
            onClick={handleToPieces}
          >
            <ArrowUpIcon size={20} />
            <span>To Pieces</span>
          </button>

          <button
            type='button'
            className={btn({ theme: 'secondary' })}
            onClick={handleToRawText}
          >
            <ArrowDownIcon size={20} />
            <span>To Raw Text</span>
          </button>
        </div>

        <textarea
          dir='auto'
          value={rawText}
          onChange={e => setRawText(e.target.value)}
          className={styleInput({
            isMultiline: true,
            class: 'min-h-80 font-mono',
          })}
        />
      </main>
    </div>
  )
}

/** Reusable button for a single piece */
const PieceButton = (p: {
  piece: Piece
  onClick: () => void
  showTimestamp: boolean
}) => (
  <button
    type='button'
    onClick={p.onClick}
    className={btn({
      theme: p.piece.isFirstWord ? 'primary' : 'secondary',
      size: 'sm',
    })}
  >
    <span>{p.piece.text}</span>

    {p.showTimestamp && (
      <code className='opacity-50 text-xs'>({p.piece.timestamp})</code>
    )}
  </button>
)
