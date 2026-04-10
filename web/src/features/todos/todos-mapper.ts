import type {
  ChangeTodoRequest,
  CreateTodoRequest,
  TodoResponse,
} from "#/common/api/client"
import type { TodoQueryState } from "./hooks/use-todo-query-store"
import type { TodoFormData } from "./organisms/todo-form"
import type { TodoListFilterFormData } from "./organisms/todo-list-filter-form"

export const todosMapper = {
  mapTodoResponse: {
    toTodoFormData: (input: TodoResponse): TodoFormData => ({
      bucket: input.bucket,
      contexts: input.contexts,
      description: input.description || "",
      dueDate: input.dueDate,
      effortType: input.effortType,
      energyLevel: input.energyLevel,
      isDone: input.isDone,
      isUrgent: input.isUrgent,
      pomodoroEstimate: input.estimatedPomodoros || 0,
      priority: input.priority,
      title: input.title,
      waitingForInfo: input.waitingForInfo,
      why: input.why || "",
    }),
  },

  mapTodoFormData: {
    toChangeTodoData: (input: TodoFormData): ChangeTodoRequest => ({
      bucket: input.bucket,
      contexts: input.contexts,
      description: input.description || null,
      dueDate: input.dueDate,
      effortType: input.effortType,
      energyLevel: input.energyLevel,
      estimatedPomodoros: input.pomodoroEstimate,
      isDone: input.isDone,
      isUrgent: input.isUrgent,
      priority: input.priority,
      title: input.title,
      waitingForInfo:
        input.waitingForInfo != null ? input.waitingForInfo : null,
      why: input.why || null,
    }),

    toCreateTodoRequest: (input: TodoFormData): CreateTodoRequest => ({
      title: input.title,
      bucket: input.bucket,
      contexts: input.contexts.map(c => c.trim()).filter(c => !!c),
      description: input.description || null,
      dueDate: input.dueDate,
      effortType: input.effortType,
      energyLevel: input.energyLevel,
      isDone: input.isDone,
      isUrgent: input.isUrgent,
      pomodoroEstimate: input.pomodoroEstimate,
      priority: input.priority,
      why: input.why || null,
      waitingForInfo: input.waitingForInfo
        ? {
            description: input.waitingForInfo.description,
            reviewAt: input.waitingForInfo.reviewAt,
          }
        : null,
    }),
  },

  mapTodoQueryStore: {
    toTodoListFilterFormData: (
      input: TodoQueryState,
    ): TodoListFilterFormData => ({
      availableEnergyLevel: input.availableEnergyLevel,
      availablePomodoros: input.availablePomodoros ?? 0,
      bucket: input.bucket,
      excludeQuery: input.excludeQuery || "",
      isPomodoroFilteringEnabled: input.availablePomodoros != null,
      q: input.q || "",
      sortBy: input.sortBy,
      sortOrder: input.sortOrder,
    }),
  },
}
