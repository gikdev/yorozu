import { ClipboardIcon, SpeakerHighIcon, StopIcon } from "@phosphor-icons/react"
import { createFileRoute, linkOptions } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import { btn } from "#/common/atoms/btn"
import { AppBar } from "#/common/molecules/page-header"

const TITLE = "Text to Speech"

export const Route = createFileRoute("/apps/tts")({
  head: () => ({ meta: [{ title: TITLE }] }),
  component: RouteComponent,
})

// Language options: display label + BCP47 code
const LANGUAGE_OPTIONS = [
  { label: "English (US)", code: "en-US" },
  { label: "日本語", code: "ja-JP" },
  // { label: "فارسی", code: "fa-IR" },
  // { label: "Español", code: "es-ES" },
]

function RouteComponent() {
  const [text, setText] = useState("")
  const [selectedLang, setSelectedLang] = useState(LANGUAGE_OPTIONS[0])
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(1)
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null)

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Load voices when they become available
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices()
      setVoices(availableVoices)
      // Set default voice to first matching language or first available
      const defaultVoice =
        availableVoices.find(v => v.lang.startsWith(selectedLang.code)) ||
        availableVoices[0] ||
        null
      setSelectedVoice(defaultVoice)
    }

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
    loadVoices()

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [selectedLang])

  // Filter voices by selected language
  const filteredVoices = voices.filter(v =>
    v.lang.startsWith(selectedLang.code),
  )

  // Update selected voice when language changes
  useEffect(() => {
    const matching =
      filteredVoices.find(v => v.lang.startsWith(selectedLang.code)) ||
      filteredVoices[0] ||
      null
    setSelectedVoice(matching)
  }, [selectedLang, filteredVoices])

  function speak() {
    if (!text.trim()) return
    if (speaking) {
      // If already speaking, resume if paused
      if (paused) {
        window.speechSynthesis.resume()
        setPaused(false)
      }
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = selectedLang.code
    utterance.rate = rate
    utterance.pitch = pitch
    utterance.volume = volume
    if (selectedVoice) utterance.voice = selectedVoice

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => {
      setSpeaking(false)
      setPaused(false)
    }
    utterance.onpause = () => setPaused(true)
    utterance.onresume = () => setPaused(false)
    utterance.onerror = e => {
      console.error("Speech error:", e)
      setSpeaking(false)
      setPaused(false)
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  function stopSpeech() {
    window.speechSynthesis.cancel()
    setSpeaking(false)
    setPaused(false)
  }

  function copyText() {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-mist-950 text-mist-400 max-w-240 mx-auto w-full">
      <AppBar title={TITLE} parentPath={linkOptions({ to: "/apps" })}>
        <button
          className={btn({ isIcon: true })}
          onClick={copyText}
          type="button"
          disabled={!text}
          aria-label="Copy text"
        >
          <ClipboardIcon size={24} />
        </button>
      </AppBar>

      <main className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto min-h-0">
        {/* Text input */}
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text to speak..."
          className="flex-1 min-h-30 bg-mist-900 rounded px-3 py-2 text-sm outline-none resize-none"
        />

        {/* Controls row: language, voice, rate, pitch, volume */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Language */}
          <div>
            {/** biome-ignore lint/a11y/noLabelWithoutControl: 大丈夫! */}
            <label className="block text-xs text-mist-500 mb-1">Language</label>
            <select
              value={selectedLang.code}
              onChange={e => {
                const found = LANGUAGE_OPTIONS.find(
                  opt => opt.code === e.target.value,
                )
                if (found) setSelectedLang(found)
              }}
              className="w-full bg-mist-900 rounded px-3 py-2 text-sm outline-none"
            >
              {LANGUAGE_OPTIONS.map(opt => (
                <option key={opt.code} value={opt.code}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Voice */}
          <div>
            {/** biome-ignore lint/a11y/noLabelWithoutControl: 大丈夫! */}
            <label className="block text-xs text-mist-500 mb-1">Voice</label>
            <select
              value={selectedVoice?.name || ""}
              onChange={e => {
                const voice = voices.find(v => v.name === e.target.value)
                if (voice) setSelectedVoice(voice)
              }}
              className="w-full bg-mist-900 rounded px-3 py-2 text-sm outline-none"
              disabled={filteredVoices.length === 0}
            >
              {filteredVoices.length === 0 && (
                <option value="">No voices available for this language</option>
              )}
              {filteredVoices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} {voice.localService ? "(local)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            {/** biome-ignore lint/a11y/noLabelWithoutControl: 大丈夫! */}
            <label className="block text-xs text-mist-500 mb-1">
              Rate: {rate.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={rate}
              onChange={e => setRate(parseFloat(e.target.value))}
              className="w-full accent-deep-sky-500"
            />
          </div>
          <div>
            {/** biome-ignore lint/a11y/noLabelWithoutControl: 大丈夫! */}
            <label className="block text-xs text-mist-500 mb-1">
              Pitch: {pitch.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={pitch}
              onChange={e => setPitch(parseFloat(e.target.value))}
              className="w-full accent-deep-sky-500"
            />
          </div>
          <div>
            {/** biome-ignore lint/a11y/noLabelWithoutControl: 大丈夫! */}
            <label className="block text-xs text-mist-500 mb-1">
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-full accent-deep-sky-500"
            />
          </div>
        </div>

        {/* Speak / Stop button */}
        <button
          className={btn({ theme: speaking ? "primary" : "glass" })}
          onClick={speaking ? stopSpeech : speak}
          disabled={!text.trim()}
          type="button"
        >
          {speaking ? (
            <>
              <StopIcon size={24} /> Stop
            </>
          ) : (
            <>
              <SpeakerHighIcon size={24} /> Speak
            </>
          )}
        </button>

        {/* Status */}
        {speaking && (
          <p className="text-xs text-mist-500 animate-pulse">
            {paused ? "⏸ Paused" : "🔊 Speaking..."}
          </p>
        )}
      </main>
    </div>
  )
}
