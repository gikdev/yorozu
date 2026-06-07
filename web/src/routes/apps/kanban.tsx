import { createFileRoute, Link } from "@tanstack/react-router"
import { useState, useEffect } from "react"
import { DownloadIcon, UploadIcon, TrashIcon } from "@phosphor-icons/react"

export const Route = createFileRoute("/apps/kanban")({
  component: KanbanBoard,
})

const STATUSES = ["To Do", "In Progress", "On Hold", "Done"] as const
type Status = (typeof STATUSES)[number]

interface Task {
  id: number
  title: string
  status: Status
}

interface Project {
  id: number
  title: string
  tasks: Task[]
}

const STORAGE_KEY = "kanban-data"

function KanbanBoard() {
  // Load from localStorage on initial render
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      } catch (e) {
        console.error("Failed to load kanban data from localStorage", e)
      }
    }
    return []
  })

  const [currentProjectId, setCurrentProjectId] = useState<number | null>(
    () => {
      const savedCurrent = localStorage.getItem(`${STORAGE_KEY}-current`)
      if (savedCurrent) {
        try {
          const parsed = JSON.parse(savedCurrent)
          if (typeof parsed === "number") return parsed
        } catch (e) {
          console.error("Failed to load current project from localStorage", e)
        }
      }
      return null
    },
  )

  const [newProjectTitle, setNewProjectTitle] = useState("")
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [idCounter, setIdCounter] = useState(() => {
    const savedCounter = localStorage.getItem(`${STORAGE_KEY}-counter`)
    if (savedCounter) {
      try {
        const parsed = JSON.parse(savedCounter)
        if (typeof parsed === "number") return parsed
      } catch (e) {
        console.error("Failed to load ID counter from localStorage", e)
      }
    }
    return 1
  })

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  // Save current project ID to localStorage
  useEffect(() => {
    if (currentProjectId === null) {
      localStorage.removeItem(`${STORAGE_KEY}-current`)
    } else {
      localStorage.setItem(
        `${STORAGE_KEY}-current`,
        JSON.stringify(currentProjectId),
      )
    }
  }, [currentProjectId])

  // Save ID counter to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}-counter`, JSON.stringify(idCounter))
  }, [idCounter])

  const nextId = () => {
    const id = idCounter
    setIdCounter(id + 1)
    return id
  }

  const currentProject = projects.find(p => p.id === currentProjectId) ?? null

  // Add project
  const addProject = () => {
    const trimmed = newProjectTitle.trim()
    if (!trimmed) return
    const project: Project = {
      id: nextId(),
      title: trimmed,
      tasks: [],
    }
    setProjects(prev => [...prev, project])
    setCurrentProjectId(project.id)
    setNewProjectTitle("")
  }

  // Delete project with confirmation
  const deleteProject = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return
    setProjects(prev => prev.filter(p => p.id !== id))
    if (currentProjectId === id) setCurrentProjectId(null)
  }

  // Add task
  const addTask = () => {
    const trimmed = newTaskTitle.trim()
    if (!trimmed || !currentProjectId) return
    const task: Task = {
      id: nextId(),
      title: trimmed,
      status: "To Do",
    }
    setProjects(prev =>
      prev.map(p =>
        p.id === currentProjectId ? { ...p, tasks: [...p.tasks, task] } : p,
      ),
    )
    setNewTaskTitle("")
  }

  // Move task left/right
  const moveTask = (taskId: number, direction: "left" | "right") => {
    if (!currentProjectId) return
    setProjects(prev =>
      prev.map(p => {
        if (p.id !== currentProjectId) return p
        return {
          ...p,
          tasks: p.tasks.map(t => {
            if (t.id !== taskId) return t
            const idx = STATUSES.indexOf(t.status)
            let newIdx = idx
            if (direction === "right" && idx < STATUSES.length - 1)
              newIdx = idx + 1
            if (direction === "left" && idx > 0) newIdx = idx - 1
            return { ...t, status: STATUSES[newIdx] }
          }),
        }
      }),
    )
  }

  // Delete task
  const deleteTask = (taskId: number) => {
    if (!currentProjectId) return
    setProjects(prev =>
      prev.map(p =>
        p.id === currentProjectId
          ? { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
          : p,
      ),
    )
  }

  // Export data as JSON file
  const exportData = () => {
    const data = {
      projects,
      currentProjectId,
      idCounter,
      version: "1.0",
      exportedAt: new Date().toISOString(),
    }
    const dataStr = JSON.stringify(data, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `kanban-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Import data from JSON file
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = e => {
      try {
        const content = e.target?.result as string
        const data = JSON.parse(content)

        // Validate imported data structure
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects)
          if (typeof data.currentProjectId === "number") {
            // Check if the imported project ID actually exists in projects
            const projectExists = data.projects.some(
              (p: Project) => p.id === data.currentProjectId,
            )
            setCurrentProjectId(projectExists ? data.currentProjectId : null)
          }
          if (typeof data.idCounter === "number") {
            setIdCounter(data.idCounter)
          }
          alert("✅ Data imported successfully!")
        } else {
          alert("❌ Invalid file format. Please export a valid Kanban backup.")
        }
      } catch (error) {
        console.error("Import failed:", error)
        alert("❌ Failed to import data. Check the file format.")
      }
    }
    reader.readAsText(file)

    // Reset file input
    event.target.value = ""
  }

  // Reset everything with confirmation
  const resetAll = () => {
    if (
      !window.confirm(
        "⚠️ This will delete ALL projects and tasks. Are you ABSOLUTELY sure?",
      )
    )
      return

    setProjects([])
    setCurrentProjectId(null)
    setIdCounter(1)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(`${STORAGE_KEY}-current`)
    localStorage.removeItem(`${STORAGE_KEY}-counter`)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <title>Kanban</title>
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col gap-3 border-r border-gray-700">
        <h2 className="text-lg font-semibold text-blue-300">
          <Link to="/">🚪</Link>
          <span>Projects</span>
        </h2>

        <div className="flex gap-1">
          <input
            type="text"
            value={newProjectTitle}
            onChange={e => setNewProjectTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addProject()}
            placeholder="New project..."
            className="flex-1 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            onClick={addProject}
            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition"
          >
            +
          </button>
        </div>

        <ul className="space-y-1 flex-1 overflow-y-auto">
          {projects.map(p => (
            <li
              key={p.id}
              className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer text-sm ${
                p.id === currentProjectId
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
              onClick={() => setCurrentProjectId(p.id)}
            >
              <span className="truncate">{p.title}</span>
              <button
                onClick={e => {
                  e.stopPropagation()
                  deleteProject(p.id)
                }}
                className="text-gray-400 hover:text-red-400 ml-1 text-xs"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Import/Export/Reset buttons */}
        <div className="border-t border-gray-700 pt-3 mt-auto space-y-2">
          <button
            onClick={exportData}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition"
            title="Export all data"
          >
            <DownloadIcon size={18} />
            <span>Export</span>
          </button>

          <label className="w-full">
            <input
              type="file"
              accept=".json"
              onChange={importData}
              className="hidden"
            />
            <button
              onClick={() =>
                document
                  .querySelector<HTMLInputElement>('input[type="file"]')
                  ?.click()
              }
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition"
              title="Import data from file"
            >
              <UploadIcon size={18} />
              <span>Import</span>
            </button>
          </label>

          <button
            onClick={resetAll}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition"
            title="Reset everything"
          >
            <TrashIcon size={18} />
            <span>Reset</span>
          </button>
        </div>
      </aside>

      {/* Main board */}
      <main className="flex-1 p-4 overflow-x-auto">
        {!currentProject ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select or create a project
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-300">
                {currentProject.title}
              </h1>
              <div className="flex gap-2 ml-auto">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addTask()}
                  placeholder="Add task..."
                  className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400"
                />
                <button
                  onClick={addTask}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Kanban columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {STATUSES.map(status => {
                const tasksInColumn = currentProject.tasks.filter(
                  t => t.status === status,
                )
                return (
                  <div
                    key={status}
                    className="bg-gray-800 rounded-lg p-3 min-h-50"
                  >
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      {status}
                    </h3>
                    <ul className="space-y-2">
                      {tasksInColumn.map(task => (
                        <li
                          key={task.id}
                          className="bg-gray-700 p-2 rounded flex flex-col gap-1"
                        >
                          <div className="flex items-start justify-between">
                            <span className="text-sm flex-1 wrap-break-word">
                              {task.title}
                            </span>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="text-gray-400 hover:text-red-400 ml-1 text-xs shrink-0"
                            >
                              ✕
                            </button>
                          </div>
                          {/* Arrow buttons */}
                          <div className="flex justify-between mt-1">
                            <button
                              onClick={() => moveTask(task.id, "left")}
                              disabled={STATUSES.indexOf(task.status) === 0}
                              className="px-2 py-0.5 text-xs rounded bg-gray-600 hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                              ←
                            </button>
                            <button
                              onClick={() => moveTask(task.id, "right")}
                              disabled={
                                STATUSES.indexOf(task.status) ===
                                STATUSES.length - 1
                              }
                              className="px-2 py-0.5 text-xs rounded bg-gray-600 hover:bg-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            >
                              →
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
