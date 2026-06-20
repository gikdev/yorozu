import { ArrowLeftIcon, PlayIcon } from "@phosphor-icons/react"
import { useRef } from "react"

interface SpotlightEmptyProps {
  onStart: (item: string) => void
  onBack: () => void
}

export function SpotlightEmpty({ onStart, onBack }: SpotlightEmptyProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = () => {
    const value = inputRef.current?.value
    if (!value) return
    if (!value.trim()) return
    onStart(value.trim())
  }

  return (
    <div className="flex flex-col h-dvh bg-mist-950 text-mist-400">
      <div className="flex-1 h-3/4 flex">
        <input
          ref={inputRef}
          autoFocus
          autoComplete="off"
          placeholder="What are you focusing on?"
          className="w-full h-full text-center bg-transparent text-3xl font-bold text-white placeholder:text-mist-400 outline-none focus:bg-mist-900 px-2 py-4 resize-none"
        />
      </div>

      <div className="h-1/4 flex items-stretch">
        <button
          onClick={onBack}
          type="button"
          className="flex-1 flex items-center justify-center gap-2 hover:bg-mist-900 hover:text-mist-100 cursor-pointer"
        >
          <ArrowLeftIcon size={36} weight="bold" />
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center gap-2 bg-sky-700 hover:bg-sky-600 hover:text-mist-100 cursor-pointer transition-colors"
        >
          <PlayIcon size={36} weight="fill" />
        </button>
      </div>
    </div>
  )
}
