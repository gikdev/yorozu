import type { TodoResponse } from "#/common/api/client"
import { TodoListItem } from "./todo-list-item"

type TodoListProps = {
  todos: TodoResponse[]
}

export function TodoList(p: TodoListProps) {
  return (
    <div className="flex flex-col">
      {p.todos.map(t => (
        <TodoListItem
          key={t.id}
          isCheckboxLoading={false}
          isDone={t.isDone}
          isTitleLoading={false}
          onCheckboxClick={() => {}}
          onMoreOptionsClick={() => {}}
          onTitleClick={() => {}}
          title={t.title}
        />
      ))}
    </div>
  )
}
