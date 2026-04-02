import type { TodoResponse } from "#/common/api/client"
import { TodoListItem } from "./todo-list-item"

type TodoListProps = {
  todos: TodoResponse[]
  onCheckboxClick: (todoId: string, isCurrentlyDone: boolean) => void
  onTitleClick: (todoId: string) => void
  onMoreOptionsClick: (todoId: string) => void
  loadingCheckboxTodoId: string | null
}

export function TodoList(p: TodoListProps) {
  return (
    <div className="flex flex-col">
      {p.todos.map(t => (
        <TodoListItem
          key={t.id}
          todoId={t.id}
          title={t.title}
          isDone={t.isDone}
          isTitleLoading={false}
          isCheckboxLoading={t.id === p.loadingCheckboxTodoId}
          onTitleClick={p.onTitleClick}
          onCheckboxClick={p.onCheckboxClick}
          onMoreOptionsClick={p.onMoreOptionsClick}
        />
      ))}
    </div>
  )
}
