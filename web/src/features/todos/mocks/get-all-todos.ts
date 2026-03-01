import { http, HttpResponse } from 'msw'
import { TodosRepo } from './common'
import type { TodoListResponse } from '#/common/api/client'

export const getAllTodos = http.get('/api/todos', () => {
  const response: TodoListResponse = {
    items: TodosRepo.getTodos(),
    includesArchived: false,
  }

  return HttpResponse.json(response)
})
