import type { TodoResponse } from "#/common/api/client"
import { TodoListItem } from "./todo-list-item"

type TodoListProps = {
  todos: TodoResponse[]
  onCheckboxClick: (todoId: string) => void
  onTitleClick: (todoId: string) => void
  onMoreOptionsClick: (todoId: string) => void
}

export function TodoList(p: TodoListProps) {
  return (
    <div className="flex flex-col">
      {p.todos.map(t => (
        <TodoListItem
          key={t.id}
          todoId={t.id}
          isCheckboxLoading={false}
          isDone={t.isDone}
          isTitleLoading={false}
          onCheckboxClick={p.onCheckboxClick}
          onMoreOptionsClick={p.onMoreOptionsClick}
          onTitleClick={p.onTitleClick}
          title={t.title}
        />
      ))}
    </div>
  )
}
