<script lang="ts" setup>
import CreateTodoForm from '#/features/todos/molecules/CreateTodoForm.vue'
import TodoHeader from '#/features/todos/organisms/TodoHeader.vue'
import TodosList from '#/features/todos/organisms/TodosList.vue'
import { useMutation, useQuery } from '@pinia/colada'
import * as v from 'valibot'
import { createTodoMutation, listTodosQuery } from '#/common/api/generated/client-dev'

const schema = v.pipe(
  v.string(),
  v.minLength(1, 'Task title cannot be empty!!!'),
  v.minLength(3, 'Task title is too short!!!'),
)

function validateTodoTitle(value: string): string | null {
  const result = v.safeParse(schema, value)

  return result.success ? null : (result.issues[0]?.message ?? 'Invalid input')
}

const listTodosQ = useQuery(listTodosQuery())

const createTodoM = useMutation({
  ...createTodoMutation(),
  onSuccess: () => listTodosQ.refetch(),
})

const createTodo = (rawTitle: string) => {
  createTodoM.mutate({ body: { rawTitle } })
}
</script>

<template>
  <div class="max-w-120 mx-auto bg-slate-900 h-dvh text-white flex flex-col">
    <TodoHeader />

    <main class="px-4 flex-1 overflow-y-auto">
      <CreateTodoForm
        :is-loading="createTodoM.isLoading.value"
        :validator="validateTodoTitle"
        @submit="createTodo"
      />

      <TodosList
        v-if="listTodosQ.status.value === 'success'"
        :items="listTodosQ.data.value?.items ?? []"
      />
      <p v-else-if="listTodosQ.status.value === 'pending'" class="p-4">Loading...</p>
      <p v-else class="p-4 text-red-400">Failed to load todos</p>
    </main>
  </div>
</template>
