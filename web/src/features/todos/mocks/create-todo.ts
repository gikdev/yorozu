import { http, HttpResponse } from 'msw'
import { TodosRepo } from './common'
import * as v from 'valibot'
import type { TodoResponse } from '#/common/api/generated/client-dev'

export const createTodo = http.post('/api/todos', async ({ request }) => {
  const schema = v.object({
    rawTitle: v.pipe(v.string(), v.minLength(1, 'Title cannot be empty')),
  })

  const bodyRaw = await request.json()

  const parsed = v.safeParse(schema, bodyRaw)

  if (!parsed.success) {
    return HttpResponse.json(
      { error: parsed.issues[0]?.message ?? 'Invalid request' },
      { status: 400 },
    )
  }

  const body = parsed.output

  const newTodo: TodoResponse = {
    id: crypto.randomUUID(),
    title: body.rawTitle,
    rawTitle: body.rawTitle,
    context: null,
    project: null,
    time: null,
    tag: null,
    energy: null,
    isImportant: false,
    isUrgent: false,
    isDone: false,
  }

  TodosRepo.addTodo(newTodo)

  return HttpResponse.json(newTodo)
})
