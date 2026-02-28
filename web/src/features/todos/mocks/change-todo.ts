import { http, HttpResponse } from 'msw'
import { TodosRepo } from './common'
import * as v from 'valibot'
import { vChangeTodoRequest, type TodoResponse } from '#/common/api/client'

export const changeTodo = http.patch('/api/todos/:id', async ({ request, params }) => {
  const id = params.id

  if (typeof id !== 'string') {
    return HttpResponse.json({ error: 'Not found!' }, { status: 404 })
  }

  const bodyRaw = await request.json()

  const parsed = v.safeParse(vChangeTodoRequest, bodyRaw)

  if (!parsed.success) {
    return HttpResponse.json(
      { error: parsed.issues[0]?.message ?? 'Invalid request' },
      { status: 400 },
    )
  }

  const body = parsed.output

  let updatedTodo: TodoResponse | null = null

  if (body.isDone != null) {
    updatedTodo = TodosRepo.toggleTodoStatus(id, body.isDone.value)
  }

  if (body.rawTitle != null) {
    updatedTodo = TodosRepo.renameTodoTitle(id, body.rawTitle.value)
  }

  if (body.isArchived != null) {
    updatedTodo = TodosRepo.archiveTodo(id, body.isArchived.value)
  }

  if (!updatedTodo) {
    return HttpResponse.json({ error: 'Not found!' }, { status: 404 })
  }

  return HttpResponse.json(updatedTodo)
})
