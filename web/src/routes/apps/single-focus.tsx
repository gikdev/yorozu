import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useState, type SubmitEvent } from "react"

export const Route = createFileRoute("/apps/single-focus")({
  component: FocusHelper,
})

const STORAGE_KEY = "single-focus"

function FocusHelper() {
  const [focusInput, setFocusInput] = useState("")
  const [currentFocus, setCurrentFocus] = useState<string | null>(() => {
    // Load saved focus from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed === "string" || parsed === null) return parsed
      } catch (e) {
        console.error("Failed to load focus from localStorage", e)
      }
    }
    return null
  })
  const [showToast, setShowToast] = useState(false)

  // Save currentFocus to localStorage whenever it changes
  useEffect(() => {
    if (currentFocus === null) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentFocus))
    }
  }, [currentFocus])

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (!showToast) return
    const timer = setTimeout(() => setShowToast(false), 3000)
    return () => clearTimeout(timer)
  }, [showToast])

  const handleSetFocus = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = focusInput.trim()
    if (!trimmed) return
    setCurrentFocus(trimmed)
    setFocusInput("")
  }

  const handleCancel = () => setCurrentFocus(null)
  const handleDone = () => {
    setCurrentFocus(null)
    setShowToast(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <title>Single Focus</title>
      <div className="w-full max-w-md mx-auto">
        {!currentFocus ? (
          /* Input state */
          <form onSubmit={handleSetFocus} className="space-y-4">
            <label htmlFor="focus-input" className="block text-lg font-medium">
              <Link to="/">🚪</Link>
              <span>What do you want to focus on?</span>
            </label>
            <input
              id="focus-input"
              type="text"
              value={focusInput}
              onChange={e => setFocusInput(e.target.value)}
              placeholder="e.g. Finish the landing page"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-500 text-gray-100"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
            >
              Set Focus
            </button>
          </form>
        ) : (
          /* Focus active state */
          <div className="text-center space-y-6">
            <p className="text-sm text-gray-400 uppercase tracking-wide">
              Currently focusing on
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-cyan-300 wrap-break-word">
              {currentFocus}
            </h1>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDone}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
              >
                Mark as Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-cyan-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <span className="text-xl">🎉</span>
          <span className="font-medium">Done! Great job!</span>
        </div>
      )}
    </div>
  )
}
