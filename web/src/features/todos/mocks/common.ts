import type { TodoResponse } from '#/common/api/generated/client-dev'

export class TodosRepo {
  private static _todos: TodoResponse[] = [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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

  static addTodo(todo: TodoResponse): void {
    this._todos.unshift(todo)
  }
}
