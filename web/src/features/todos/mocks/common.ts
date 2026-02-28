import type { TodoResponse } from '#/common/api/client'

export class TodosRepo {
  private static _todos: TodoResponse[] = [
    {
      id: '8ecaceb2-0795-4601-8b78-f8eac38ddb36',
      title: 'Finish homepage UI',
      rawTitle: 'Finish homepage UI',
      context: 'work',
      project: 'webapp',
      time: 30,
      tag: 'frontend',
      energy: '$$$',
      isImportant: true,
      isUrgent: false,
      isDone: false,
    },
    {
      id: '873f36cb-2763-4b80-90f6-877103ecb950',
      title: 'Write API documentation',
      rawTitle: 'Write API documentation',
      context: 'study',
      project: 'backend',
      time: 20,
      tag: 'docs',
      energy: '$$',
      isImportant: false,
      isUrgent: true,
      isDone: false,
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
    },
  ]

  static getTodos(): TodoResponse[] {
    return structuredClone(this._todos)
  }

  static toggleTodoStatus(id: string, newIsDone: boolean | undefined | null): TodoResponse | null {
    const todo = this._todos.find((todo) => todo.id === id)

    if (!todo) return null

    todo.isDone = newIsDone ?? !todo.isDone

    return structuredClone(todo)
  }

  static addTodo(todo: TodoResponse): void {
    this._todos.unshift(todo)
  }
}
