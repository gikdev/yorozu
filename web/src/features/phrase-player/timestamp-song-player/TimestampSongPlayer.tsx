import {
  FilePlusIcon,
  PauseIcon,
  PlayIcon,
  TrashIcon,
} from '@phosphor-icons/react'
import { useSelector } from '@tanstack/react-store'
import { type ChangeEvent, type SyntheticEvent, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { btn } from '#/common/atoms/btn'
import { styleInput } from '#/common/atoms/input'
import { songPlayerStore } from './store'
import { TimestampCards } from './TimestampCards'

export function TimestampSongPlayer() {
  const blobRef = useRef<string>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const currentTime = useSelector(songPlayerStore, s => s.currentTime)
  const isPlaying = useSelector(songPlayerStore, s => s.isPlaying)
  const songUrl = useSelector(songPlayerStore, s => s.songUrl)
  const totalTime = useSelector(songPlayerStore, s => s.totalTime)

  const handlePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const handleTimeUpdate = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const currentCurrentTime = +currentTime.toFixed(1)
    const nextCurrentTime = +e.currentTarget.currentTime.toFixed(1)

    if (currentCurrentTime === nextCurrentTime) return

    songPlayerStore.actions.setCurrentTime(nextCurrentTime)
  }

  const handleFileUpload = (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    if (!audioRef.current) return

    const file = e.target.files?.[0]
    if (!file) return

    blobRef.current = URL.createObjectURL(file)
    songPlayerStore.actions.setSongUrl(blobRef.current)
    audioRef.current.src = blobRef.current
    e.target.value = ''

    toast.success('Successfully set.')
  }

  const handleDelete = () => {
    if (!audioRef.current) return
    songPlayerStore.actions.setSongUrl(null)
    songPlayerStore.actions.pause()
    songPlayerStore.actions.setTotalTime(null)
    audioRef.current.pause()
    audioRef.current.src = ''
    if (blobRef.current) {
      URL.revokeObjectURL(blobRef.current)
    }
  }

  const handleSetCurrentTime = (currentTime: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = currentTime
  }

  const handleRewind = (seconds: number) => {
    if (!audioRef.current) return
    handleSetCurrentTime(audioRef.current.currentTime - seconds)
  }

  const handleFastForward = (seconds: number) => {
    if (!audioRef.current) return
    handleSetCurrentTime(audioRef.current.currentTime + seconds)
  }

  useEffect(() => {
    return () => {
      if (!blobRef.current) return
      URL.revokeObjectURL(blobRef.current)
    }
  }, [])

  return (
    <div className='flex flex-col gap-4 w-full bg-mist-900 p-8 rounded-lg'>
      <div className='flex items-center justify-center gap-2'>
        <input
          disabled={songUrl == null}
          type='range'
          step={0.1}
          value={currentTime}
          max={totalTime || 0}
          onChange={e => handleSetCurrentTime(e.target.valueAsNumber)}
          className='cursor-pointer disabled:cursor-not-allowed accent-sky-500 flex-1'
        />

        <input
          type='number'
          disabled={isPlaying || songUrl == null}
          value={isPlaying ? currentTime : undefined}
          min={0}
          max={totalTime || 0}
          step={0.1}
          onBlur={e => handleSetCurrentTime(e.target.valueAsNumber)}
          className={styleInput()}
        />
      </div>

      <div className='flex items-center justify-center gap-1 *:flex-1'>
        <label className={btn({ theme: 'outline' })}>
          <FilePlusIcon size={24} />

          <input className='hidden' type='file' onChange={handleFileUpload} />
        </label>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ class: 'font-mono' })}
          onClick={() => handleRewind(5)}
        >
          <span>-5s</span>
        </button>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ class: 'font-mono' })}
          onClick={() => handleRewind(1)}
        >
          <span>-1s</span>
        </button>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ class: 'font-mono' })}
          onClick={() => handleRewind(0.5)}
        >
          <span>-0.5s</span>
        </button>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ class: 'font-mono' })}
          onClick={() => handleRewind(0.1)}
        >
          <span>-0.1s</span>
        </button>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ size: 'lg', theme: 'primary' })}
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <PauseIcon size={36} weight='fill' />
          ) : (
            <PlayIcon size={36} weight='fill' />
          )}
        </button>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ class: 'font-mono' })}
          onClick={() => handleFastForward(0.1)}
        >
          <span>+0.1s</span>
        </button>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ class: 'font-mono' })}
          onClick={() => handleFastForward(0.5)}
        >
          <span>+0.5s</span>
        </button>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ class: 'font-mono' })}
          onClick={() => handleFastForward(1)}
        >
          <span>+1s</span>
        </button>

        <button
          type='button'
          disabled={songUrl == null}
          className={btn({ class: 'font-mono' })}
          onClick={() => handleFastForward(5)}
        >
          <span>+5s</span>
        </button>

        <button
          title='Remove audio'
          className={btn({ theme: 'danger' })}
          type='button'
          onClick={handleDelete}
        >
          <TrashIcon size={24} />
        </button>
      </div>

      <TimestampCards />

      {/** biome-ignore lint/a11y/useMediaCaption: いいんだよ！ */}
      <audio
        controls
        ref={audioRef}
        className='w-full hidden'
        // biome-ignore lint/correctness/noChildrenProp: いいんだよ！
        children='Audio not supported.'
        onLoadedMetadata={e =>
          songPlayerStore.actions.setTotalTime(e.currentTarget.duration)
        }
        onPause={() => songPlayerStore.actions.pause()}
        onPlay={() => songPlayerStore.actions.play()}
        onTimeUpdate={handleTimeUpdate}
        onError={e => {
          toast.error('An error related to audio has occured.')
          console.log(e)
        }}
      />
    </div>
  )
}
