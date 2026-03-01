import { setupWorker } from 'msw/browser'
import * as todos from '#/features/todos/mocks'
import type { HttpHandler } from 'msw'

// const IS_MOCK_MODE = true
const IS_MOCK_MODE = false

const handlers: HttpHandler[] = [...Object.values(todos)]

export async function enableMocking() {
  if (!import.meta.env.DEV) return
  if (!IS_MOCK_MODE) return

  const worker = setupWorker(...handlers)

  const result = await worker.start()

  return result
}
