import type { TodoResponse } from '#/common/api/client'

export class TodosRepo {
  private static _todos: TodoResponse[] = [
    {
      id: '8ecaceb2-0795-4601-8b78-f8eac38ddb36',
      title: 'Finish homepage UI',
      rawTitle: '* Finish homepage UI @work +webapp #frontend ~30 $$$',
      context: 'work',
      project: 'webapp',
      time: 30,
      tag: 'frontend',
      energy: '$$$',
      isImportant: true,
      isUrgent: false,
      isDone: false,
      isArchived: false,
    },
    {
      id: '873f36cb-2763-4b80-90f6-877103ecb950',
      title: 'Write API documentation',
      rawTitle: '! Write API documentation @study +backend #docs ~20 $$',
      context: 'study',
      project: 'backend',
      time: 20,
      tag: 'docs',
      energy: '$$',
      isImportant: false,
      isUrgent: true,
      isDone: false,
      isArchived: false,
    },
    {
      id: 'b34d05fe-e5b7-4959-b784-02e340176d41',
      title: 'Daily standup notes',
      rawTitle: 'Daily standup notes',
      context: null,
      project: null,
      time: null,
      tag: null,
      energy: null,
      isImportant: false,
      isUrgent: false,
      isDone: false,
      isArchived: false,
    },
  ]

  static getTodos(includeArchived = false): TodoResponse[] {
    return structuredClone(
      this._todos
        .filter((t) => (includeArchived ? true : !t.isArchived))
        .sort((a, b) => {
          // First: not done (isDone === false) come before done
          if (a.isDone !== b.isDone) {
            return a.isDone ? 1 : -1
          }
          // Then: sort not-done by context (null < non-null), then lexicographically
          if (a.context === null && b.context !== null) return -1
          if (a.context !== null && b.context === null) return 1
          return (a.context || '').localeCompare(b.context || '')
        }),
    )
  }

  static toggleTodoStatus(id: string, newIsDone: boolean): TodoResponse | null {
    const todo = this._todos.find((todo) => todo.id === id)

    if (!todo) return null

    todo.isDone = newIsDone ?? !todo.isDone

    return structuredClone(todo)
  }

  static renameTodoTitle(id: string, newRawTitle: string): TodoResponse | null {
    const todo = this._todos.find((todo) => todo.id === id)

    if (!todo) return null

    todo.rawTitle = newRawTitle
    todo.title = newRawTitle

    return structuredClone(todo)
  }

  static archiveTodo(id: string, shouldBeArchived: boolean): TodoResponse | null {
    const todo = this._todos.find((todo) => todo.id === id)

    if (!todo) return null

    todo.isArchived = shouldBeArchived

    return structuredClone(todo)
  }

  static addTodo(todo: TodoResponse): void {
    this._todos.unshift(todo)
  }
}
