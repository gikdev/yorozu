import type { TodoResponse } from "#/common/api/client"
import { TodoListItem } from "../molecules/todo-list-item"

type TodoListProps = {
  todos: TodoResponse[]
  onCheckboxClick: (todoId: string, isCurrentlyDone: boolean) => void
  onTitleClick: (todoId: string) => void
  loadingCheckboxTodoId: string | null
  selectedTodoId: string | null
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
          isSelected={t.id === p.selectedTodoId}
          isTitleLoading={false}
          isCheckboxLoading={t.id === p.loadingCheckboxTodoId}
          onTitleClick={p.onTitleClick}
          onCheckboxClick={p.onCheckboxClick}
        />
      ))}
    </div>
  )
}
