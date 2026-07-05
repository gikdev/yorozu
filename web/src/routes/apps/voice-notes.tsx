import {
  FloppyDiskIcon,
  MicrophoneIcon,
  StopIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import { createFileRoute, linkOptions } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { btn } from '#/common/atoms/btn'
import { AppBar } from '#/common/molecules/page-header'

const TITLE = 'Voice Notes'

export const Route = createFileRoute('/apps/voice-notes')({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: RouteComponent,
})

function RouteComponent() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const [filename, setFilename] = useState('recording')
  const [isRecording, setIsRecording] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  // pick the best supported MIME type: prefer opus in webm/ogg
  function getSupportedMimeType(): string {
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/ogg;codecs=opus',
      'audio/webm',
      'audio/ogg',
    ]
    return candidates.find(type => MediaRecorder.isTypeSupported(type)) || ''
  }

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mimeType = getSupportedMimeType()
      const recorder = new MediaRecorder(stream, { mimeType })
      chunksRef.current = []

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        // biome-ignore lint/suspicious/useIterableCallbackReturn: 大丈夫!
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType })
        setAudioBlob(blob)
        if (audioUrl) URL.revokeObjectURL(audioUrl)
        setAudioUrl(URL.createObjectURL(blob))
        setIsRecording(false)
      }

      recorder.start()
      mediaRecorderRef.current = recorder
      setIsRecording(true)
      setAudioBlob(null)
      setAudioUrl(prev => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
    } catch (err) {
      console.error('Microphone error:', err)
      alert('Could not access microphone. Please allow mic permissions.')
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop()
  }

  function discardRecording() {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioBlob(null)
    setAudioUrl(null)
    chunksRef.current = []
  }

  function saveRecording() {
    if (!audioBlob) return
    setIsSaving(true)

    // derive extension from blob type
    const extMap: Record<string, string> = {
      'audio/webm': '.webm',
      'audio/ogg': '.ogg',
    }
    const ext = extMap[audioBlob.type] || '.webm'
    const fullName = filename.trim() || 'recording'
    const downloadName = fullName + ext

    // download via anchor
    const url = URL.createObjectURL(audioBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = downloadName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setIsSaving(false)
  }

  return (
    <div className='h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full'>
      <AppBar title={TITLE} parentPath={linkOptions({ to: '/apps' })} />

      <main className='flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0'>
        <input
          type='text'
          value={filename}
          onChange={e => setFilename(e.target.value)}
          placeholder='Recording name'
          className='bg-mist-900 rounded px-3 py-2 text-sm outline-none'
        />

        <button
          type='button'
          className={btn({ theme: isRecording ? 'primary' : 'glass' })}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <>
              <StopIcon size={24} /> Stop
            </>
          ) : (
            <>
              <MicrophoneIcon size={24} /> Record
            </>
          )}
        </button>

        {audioUrl && (
          <div className='flex flex-col gap-3'>
            {/** biome-ignore lint/a11y/useMediaCaption: 大丈夫 */}
            <audio controls src={audioUrl} className='w-full' />
            <div className='flex gap-2'>
              <button
                type='button'
                className={btn({ theme: 'primary' })}
                onClick={saveRecording}
                disabled={isSaving}
              >
                <FloppyDiskIcon size={24} /> {isSaving ? 'Saving...' : 'Save'}
              </button>
              <button
                type='button'
                className={btn({ isIcon: true })}
                onClick={discardRecording}
                aria-label='Discard recording'
              >
                <TrashIcon size={24} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
