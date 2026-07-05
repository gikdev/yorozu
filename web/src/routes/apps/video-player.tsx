import { LinkIcon, UploadSimpleIcon } from '@phosphor-icons/react'
import { createFileRoute, linkOptions } from '@tanstack/react-router'
import Artplayer from 'artplayer'
import artplayerPluginAmbilight from 'artplayer-plugin-ambilight'
import artplayerPluginAutoThumbnail from 'artplayer-plugin-auto-thumbnail'
import { useEffect, useRef, useState } from 'react'
import { btn } from '#/common/atoms/btn'
import { AppBar } from '#/common/molecules/page-header'

const TITLE = 'Video Player'

export const Route = createFileRoute('/apps/video-player')({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const artRef = useRef<Artplayer | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [url, setUrl] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !url) return

    artRef.current = new Artplayer({
      container: containerRef.current,
      url,
      id: url, // lets autoPlayback resume the right video
      theme: '#00bfff',

      // playback
      volume: 1,
      muted: false,
      autoplay: false,
      loop: false,
      autoPlayback: true, // remembers where you left off

      // controls
      pip: true,
      screenshot: true,
      setting: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: true,
      hotkey: true,
      airplay: true,

      // layout / behaviour
      autoSize: true,
      autoMini: true,
      miniProgressBar: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      lang: navigator.language.toLowerCase(),

      autoOrientation: true,
      fastForward: true,
      gesture: true,
      lock: true,

      plugins: [
        artplayerPluginAutoThumbnail({ number: 60 }),
        artplayerPluginAmbilight({}),
      ],
    })

    return () => {
      artRef.current?.destroy(false)
      artRef.current = null
    }
  }, [url])

  function loadFile(file?: File) {
    if (!file) return
    setUrl(URL.createObjectURL(file))
  }

  function promptForUrl() {
    const value = window.prompt('Paste video URL')?.trim()
    if (value) setUrl(value)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    loadFile(e.dataTransfer.files?.[0])
  }

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full'>
      <AppBar title={TITLE} parentPath={linkOptions({ to: '/apps' })}>
        <button
          className={btn({ isIcon: true })}
          type='button'
          onClick={() => fileInputRef.current?.click()}
          aria-label='Upload video'
        >
          <UploadSimpleIcon size={24} />
        </button>
        <input
          ref={fileInputRef}
          type='file'
          accept='video/*,audio/*'
          className='hidden'
          onChange={e => loadFile(e.target.files?.[0])}
        />

        <button
          className={btn({ isIcon: true })}
          type='button'
          onClick={promptForUrl}
          aria-label='Load video from URL'
        >
          <LinkIcon size={24} />
        </button>
      </AppBar>

      <main className='flex-1 flex flex-col gap-4 overflow-y-auto min-h-0'>
        <div
          ref={containerRef}
          onDragOver={e => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className='flex-1 min-h-0 rounded overflow-hidden'
          style={{ outline: isDragging ? '2px dashed #00bfff' : 'none' }}
        />
      </main>
    </div>
  )
}
