import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"

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

function KanbanBoard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<number | null>(null)
  const [newProjectTitle, setNewProjectTitle] = useState("")

  const [newTaskTitle, setNewTaskTitle] = useState("")

  const [idCounter, setIdCounter] = useState(1)
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
