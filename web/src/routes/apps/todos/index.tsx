import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { btn } from "#/common/atoms/btn"
import { useTodoQueryStore } from "#/features/todos/hooks/use-todo-query-store"
import { ClipboardTextIcon, FunnelIcon } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"
import { PlusCircleIcon } from "@phosphor-icons/react"
import { GoHomeButton } from "#/common/molecules/go-home-button"
import { useIsMobile } from "#/common/hooks/use-is-mobile"
import { TodoListView } from "#/features/todos/views/todo-list-view"
import { useState } from "react"
import { TodoDetailsView } from "#/features/todos/views/todo-details-view"
import { useDeleteTodo } from "#/features/todos/hooks/use-delete-todo"
import { header } from "#/common/atoms/header"

export const Route = createFileRoute("/apps/todos/")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const hasFilter = useTodoQueryStore(s => s.hasFilter())
  const [selectedDetailsTodoId, setSelectedDetailsTodoId] = useState<
    string | null
  >(null)

  const [removeTodo, deleteTodoM] = useDeleteTodo({})

  const handleTodoDeleteClick = () => {
    if (!selectedDetailsTodoId) return

    removeTodo(selectedDetailsTodoId)
  }

  const handleTodoEditClick = () => {
    if (!selectedDetailsTodoId) return

    navigate({
      to: "/apps/todos/$todoId/edit",
      params: { todoId: selectedDetailsTodoId },
    })
  }

  const viewTodoDetails = (todoId: string) => {
    if (isMobile) {
      navigate({
        to: "/apps/todos/$todoId",
        params: { todoId },
      })
    } else {
      setSelectedDetailsTodoId(currentTodoId =>
        currentTodoId === todoId ? null : todoId,
      )
    }
  }

  const showTodoFilters = () => {
    navigate({ to: "/apps/todos/filter" })
  }

  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <header className={header()}>
        <GoHomeButton />

        <p className="text-sky-500 font-bold text-lg mx-auto">Todos</p>

        <TodosFilterBtn hasFilter={hasFilter} onClick={showTodoFilters} />
      </header>

      <div className="flex-1 flex flex-col md:flex-row gap-2">
        <div className="flex flex-col p-2 md:w-80 border-mist-800 border-e-2">
          <TodoListView
            onTitleClick={viewTodoDetails}
            selectedTodoId={selectedDetailsTodoId}
          />

          <CreateNewTodoFab />
        </div>

        {!isMobile && (
          <div className="flex-1 p-4">
            {selectedDetailsTodoId ? (
              <TodoDetailsView
                todoId={selectedDetailsTodoId}
                isDeleteBtnLoading={deleteTodoM.isPending}
                onDelete={handleTodoDeleteClick}
                isEditBtnLoading={false}
                onEdit={handleTodoEditClick}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 flex-1 text-mist-400 gap-2">
                <ClipboardTextIcon size={40} />
                <p>No todos selected yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface TodosFilterBtnProps {
  hasFilter: boolean
  onClick: () => void
}

const TodosFilterBtn = (p: TodosFilterBtnProps) => (
  <button
    type="button"
    onClick={p.onClick}
    className={btn({ isIcon: true, className: "relative" })}
  >
    <FunnelIcon size={24} />

    {p.hasFilter && (
      <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-sky-500" />
    )}
  </button>
)

const CreateNewTodoFab = () => (
  <Link
    to="/apps/todos/new"
    className={btn({
      className: "fixed bottom-6 right-6",
      isIcon: true,
      theme: "primary",
    })}
  >
    <PlusCircleIcon weight="fill" size={24} />
  </Link>
)
