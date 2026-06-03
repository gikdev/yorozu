import { createFileRoute, Link } from "@tanstack/react-router"
import { useState, useEffect, useCallback } from "react"
import { ClipboardTextIcon, TrashIcon } from "@phosphor-icons/react"
import { btn } from "#/common/atoms/btn"

export const Route = createFileRoute("/apps/time-orbs")({
  component: TimeOrbTracker,
})

// ======================= CONFIG =======================
const CATEGORIES = [
  { key: "work", label: "Work", color: "#22d3ee" }, // cyan
  { key: "uni", label: "University", color: "#c084fc" }, // purple
  { key: "funmaintenance", label: "Fun/Maintenance", color: "#fbbf24" }, // amber
  { key: "mine", label: "Mine", color: "#fb7185" }, // rose (soft red)
  { key: "other", label: "Other", color: "#94a3b8" }, // slate gray
] as const

// ======================= TYPES =======================
interface Session {
  id: number
  category: string
  start: number
  end: number | null
}

interface AppData {
  sessions: Session[]
}

const STORAGE_KEY = "time-orb-tracker"

const loadData = (): AppData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.sessions)) return { sessions: parsed.sessions }
    }
  } catch {}
  return { sessions: [] }
}

const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ======================= COMPONENT =======================
export default function TimeOrbTracker() {
  const [data, setData] = useState<AppData>(loadData)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [now, setNow] = useState(Date.now())

  const [nextId, setNextId] = useState(() => {
    const ids = data.sessions.map(s => s.id)
    return ids.length ? Math.max(...ids) + 1 : 1
  })

  const generateId = () => {
    const id = nextId
    setNextId(id + 1)
    return id
  }

  // Tick every second while active
  useEffect(() => {
    if (!activeCategory) return
    const timer = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(timer)
  }, [activeCategory])

  // Persist
  useEffect(() => {
    saveData(data)
  }, [data])

  // Restore active session on mount
  useEffect(() => {
    const sessions = data.sessions
    if (sessions.length > 0) {
      const last = sessions[sessions.length - 1]
      if (last.end === null) setActiveCategory(last.category)
    }
  }, [])

  const handleCategoryClick = useCallback(
    (category: string) => {
      if (activeCategory === category) {
        // Stop
        setData(prev => {
          const updated = [...prev.sessions]
          const last = updated[updated.length - 1]
          if (last && last.end === null) {
            updated[updated.length - 1] = { ...last, end: Date.now() }
          }
          return { sessions: updated }
        })
        setActiveCategory(null)
      } else {
        // End previous, start new
        setData(prev => {
          const updated = [...prev.sessions]
          const last = updated[updated.length - 1]
          if (last && last.end === null) {
            updated[updated.length - 1] = { ...last, end: Date.now() }
          }
          const newSession: Session = {
            id: generateId(),
            category,
            start: Date.now(),
            end: null,
          }
          updated.push(newSession)
          return { sessions: updated }
        })
        setActiveCategory(category)
      }
    },
    [activeCategory, generateId],
  )

  const getCategoryTime = (category: string) => {
    return data.sessions.reduce((total, s) => {
      if (s.category !== category) return total
      const end = s.end ?? now
      return total + (end - s.start)
    }, 0)
  }

  const formatDuration = (ms: number) => {
    const sec = Math.floor(ms / 1000)
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  const exportJSON = () => {
    const report = data.sessions.map(s => ({
      id: s.id,
      category: s.category,
      start: new Date(s.start).toISOString(),
      end: s.end ? new Date(s.end).toISOString() : "ongoing",
      durationMs: (s.end ?? now) - s.start,
    }))
    navigator.clipboard.writeText(JSON.stringify(report, null, 2))
    alert("📋 JSON report copied to clipboard!")
  }

  const deleteData = () => {
    if (window.confirm("Delete all tracking data?")) {
      setData({ sessions: [] })
      setActiveCategory(null)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col items-center">
      <title>Time Orbs</title>
      {/* Orbs */}
      <div className="flex flex-wrap justify-center gap-6 my-8">
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.key
          const totalMs = getCategoryTime(cat.key)
          return (
            <div key={cat.key} className="flex flex-col items-center gap-2">
              <button
                onClick={() => handleCategoryClick(cat.key)}
                className={`w-24 h-24 rounded-full transition-all duration-300 shadow-lg ${
                  isActive
                    ? "scale-110 animate-float shadow-[0_0_30px_5px_rgba(255,255,255,0.3)]"
                    : "bg-gray-700 text-gray-500 shadow-none"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: cat.color,
                        boxShadow: `0 0 40px 10px ${cat.color}80`,
                      }
                    : {}
                }
              >
                {/* Orb is empty, color only */}
              </button>
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              >
                {cat.label}
              </span>
              <span className="text-xs text-cyan-300 font-mono">
                {formatDuration(totalMs)}
              </span>
            </div>
          )
        })}
      </div>

      <div className="text-center mb-6">
        {activeCategory ? (
          <p className="text-lg">
            Tracking:{" "}
            <span
              className="font-bold"
              style={{
                color: CATEGORIES.find(c => c.key === activeCategory)?.color,
              }}
            >
              {CATEGORIES.find(c => c.key === activeCategory)?.label}
            </span>
          </p>
        ) : (
          <p className="text-gray-400">Click an orb to start tracking</p>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <Link to="/" className={btn({ isIcon: true })}>
          🚪
        </Link>
        <button
          onClick={exportJSON}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded transition"
        >
          <ClipboardTextIcon size={20} weight="bold" />
          Export JSON
        </button>
        <button
          onClick={deleteData}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition"
        >
          <TrashIcon size={20} weight="bold" />
          Delete Data
        </button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
