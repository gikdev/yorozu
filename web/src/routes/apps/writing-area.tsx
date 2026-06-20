import { createFileRoute } from "@tanstack/react-router"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  UploadSimpleIcon,
  DownloadSimpleIcon,
  TrashSimpleIcon,
} from "@phosphor-icons/react"
import { useRef } from "react"

export const Route = createFileRoute("/apps/writing-area")({
  component: RouteComponent,
})

function RouteComponent() {
  return <WritingArea />
}

type Theme = "paper" | "dark" | "hacker" | "code" | "japanese"

interface WritingState {
  content: string
  fontSize: number
  theme: Theme

  setContent: (content: string) => void
  setFontSize: (size: number) => void
  setTheme: (theme: Theme) => void
}

const useWritingStore = create<WritingState>()(
  persist(
    set => ({
      content: "",
      fontSize: 18,
      theme: "dark",

      setContent: content => set({ content }),
      setFontSize: fontSize => set({ fontSize }),
      setTheme: theme => set({ theme }),
    }),
    { name: "yorozu-writing" },
  ),
)

const themeStyles: Record<
  Theme,
  { container: string; textarea: string; header: string; label: string }
> = {
  paper: {
    container: "bg-amber-50 text-mist-800",
    textarea: "bg-amber-50 text-mist-800 placeholder-mist-400 font-serif",
    header: "bg-amber-100 border-b border-amber-200 text-mist-700",
    label: "Paper",
  },
  dark: {
    container: "bg-mist-950 text-mist-100",
    textarea: "bg-mist-950 text-mist-100 placeholder-mist-400",
    header: "bg-mist-900 border-b border-mist-800 text-mist-400",
    label: "Dark",
  },
  hacker: {
    container: "bg-black text-green-400 font-mono",
    textarea: "bg-black text-green-400 placeholder-green-700 font-mono",
    header: "bg-green-950 border-b border-green-900 text-green-300",
    label: "Hacker",
  },
  code: {
    container: "bg-mist-900 text-mist-100 font-mono",
    textarea: "bg-mist-900 text-mist-100 placeholder-mist-600 font-mono",
    header: "bg-mist-800 border-b border-mist-700 text-mist-400",
    label: "Code",
  },
  japanese: {
    container: "bg-[#1a1a1a] text-[#e0d7c6] font-['Noto_Serif_JP',serif]",
    textarea:
      "bg-[#121212] text-[#e0d7c6] placeholder-[#5a5248] font-['Noto_Serif_JP',serif]",
    header: "bg-[#2a2118] border-b border-[#4a2e2e] text-[#c49a6c]",
    label: "Japanese",
  },
}

function WritingArea() {
  const { content, fontSize, theme, setContent, setFontSize, setTheme } =
    useWritingStore()
  const style = themeStyles[theme]
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Upload handler ──
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = event => {
      const text = event.target?.result
      if (typeof text === "string") setContent(text)
    }
    reader.readAsText(file)
    // Reset input so the same file can be re‑uploaded if needed
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // ── Download handler ──
  const handleDownload = () => {
    const now = new Date()
    const pad = (n: number) => n.toString().padStart(2, "0")
    const defaultName = `note-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}.txt`
    const filename = window.prompt("File name:", defaultName)
    if (!filename) return

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ── Reset handler ──
  const handleReset = () => {
    if (!window.confirm("Clear all content?")) return
    setContent("")
  }

  return (
    <div className={`flex flex-col h-dvh ${style.container}`}>
      {/* Google Fonts link – keep in index.html, not here; removed for correctness */}

      {/* Header Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 ${style.header}`}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold tracking-wide">Writing Area</h1>

          {/* Action buttons */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload .txt file"
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            <UploadSimpleIcon size={18} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,text/plain"
            onChange={handleUpload}
            className="hidden"
          />

          <button
            onClick={handleDownload}
            title="Download as .txt"
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            <DownloadSimpleIcon size={18} />
          </button>

          <button
            onClick={handleReset}
            title="Clear all"
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
          >
            <TrashSimpleIcon size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme select */}
          <select
            value={theme}
            onChange={e => setTheme(e.target.value as Theme)}
            className="bg-transparent border border-current/30 rounded px-2 py-1 text-sm outline-none cursor-pointer"
          >
            {(Object.keys(themeStyles) as Theme[]).map(t => (
              <option key={t} value={t} className="bg-mist-900 text-mist-100">
                {themeStyles[t].label}
              </option>
            ))}
          </select>

          {/* Font size controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFontSize(Math.max(8, fontSize - 2))}
              className="px-2 py-1 text-lg font-bold hover:bg-white/10 rounded"
            >
              A-
            </button>
            <span className="min-w-[3ch] text-center text-sm tabular-nums">
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize(Math.min(80, fontSize + 2))}
              className="px-2 py-1 text-lg font-bold hover:bg-white/10 rounded"
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Text area */}
      <textarea
        dir="auto"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Start writing..."
        className={`flex-1 w-full resize-none px-4 py-4 outline-none ${style.textarea}`}
        style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
      />
    </div>
  )
}
