import { http, HttpResponse } from 'msw'
import { TodosRepo } from './common'
import type { TodosResponse } from '#/common/api/client'

export const getAllTodos = http.get('/api/todos', () => {
  const response: TodosResponse = {
    items: TodosRepo.getTodos(),
  }

  return HttpResponse.json(response)
})
