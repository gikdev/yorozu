import { http, HttpResponse } from 'msw'
import { TodosRepo } from './common'
import * as v from 'valibot'

export const toggleTodoStatus = http.patch('/api/todos/:id/status', async ({ request, params }) => {
  const id = params.id

  if (typeof id !== "string") {
    return HttpResponse.json({ error: 'Not found!' }, { status: 404 })
  }

  const schema = v.object({
    isDone: v.optional(v.nullable(v.boolean())),
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

  const updatedTodo = TodosRepo.toggleTodoStatus(id, body.isDone)

  if (!updatedTodo) {
    return HttpResponse.json({ error: 'Not found!' }, { status: 404 })
  }

  return HttpResponse.json(updatedTodo)
})
