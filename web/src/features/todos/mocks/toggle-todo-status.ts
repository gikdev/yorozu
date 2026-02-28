import { http, HttpResponse } from 'msw'
import { TodosRepo } from './common'
import * as v from 'valibot'

export const toggleTodoStatus = http.patch('/api/todos/{id}/status', async ({ request }) => {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (!id) {
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
    return HttpResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }

  return HttpResponse.json(updatedTodo)
})
