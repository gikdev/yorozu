import { http, HttpResponse } from 'msw'
import { TodosRepo } from './common'
import type { TodoListResponse } from '#/common/api/client'

export const getAllTodos = http.get('/api/todos', async ({ request }) => {
  const url = request.url
  const urlSearchParams = new URLSearchParams(url)
  const includesArchivedRaw = urlSearchParams.get('includes_archived')
  const includesArchived = parseRawBooleanString(includesArchivedRaw ?? 'false') ?? false

  const response: TodoListResponse = {
    items: TodosRepo.getTodos(includesArchived),
    includesArchived,
  }

  return HttpResponse.json(response)
})

const parseRawBooleanString = (str: string): boolean | null => {
  if (str.toLowerCase() === 'true') return true
  if (str.toLowerCase() === 'false') return false
  return null
}
