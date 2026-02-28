<script lang="ts" setup>
import CreateTodoForm from '#/features/todos/molecules/CreateTodoForm.vue'
import TodoHeader from '#/features/todos/organisms/TodoHeader.vue'
import TodosList from '#/features/todos/organisms/TodosList.vue'
import { useMutation, useQuery } from '@pinia/colada'
import * as v from 'valibot'
import { createTodoMutation, listTodosQuery, changeTodoMutation } from '#/common/api/client'
import { computed, ref } from 'vue'
import TodoBottomSheet from '#/features/todos/organisms/TodoBottomSheet.vue'
import { btn } from '#/common/atoms/btn'
import TodoFormSheet from '#/features/todos/organisms/TodoFormSheet.vue'

//#region List Todos
const listTodosQ = useQuery(listTodosQuery())
const refetchTodos = () => listTodosQ.refetch()
//#endregion

//#region Create Todo
const createTodoM = useMutation({
  ...createTodoMutation(),
  onSuccess: refetchTodos,
})

function validateTodoTitle(value: string): string | null {
  const schema = v.pipe(
    v.string(),
    v.minLength(1, 'Task title cannot be empty!!!'),
    v.minLength(3, 'Task title is too short!!!'),
  )

  const result = v.safeParse(schema, value)

  const errorMsg = result.issues?.[0]?.message ?? 'Invalid input'

  return result.success ? null : errorMsg
}

function createTodo(rawTitle: string) {
  createTodoM.mutate({ body: { rawTitle } })
}
//#endregion

//#region Options Sheet
const optionsSheetTodoId = ref<string | null>(null)
const isOptionsSheetOpen = computed(() => optionsSheetTodoId.value != null)
const optionsSheetTodo = computed(() => {
  const todo = listTodosQ.data.value?.items.find((t) => t.id === editingSheetTodoId.value)

  return todo
})

function openOptionsSheet(id: string) {
  const isAnythingSelected = optionsSheetTodoId.value != null
  optionsSheetTodoId.value = isAnythingSelected ? null : id
}

function closeOptionsSheet() {
  optionsSheetTodoId.value = null
}
//#endregion

//#region Archive Todo
const archiveTodoM = useMutation({
  ...changeTodoMutation(),
  onSuccess: () => {
    refetchTodos()
    closeOptionsSheet()
  },
})

function archiveTodo() {
  const id = optionsSheetTodoId.value
  if (!id) return

  if (!confirm('Sure?')) return

  archiveTodoM.mutate({
    path: { id },
    body: {
      isArchived: {
        value: true,
      },
    },
  })
}
//#endregion

//#region Toggle Todo
const toggleTodoM = useMutation({
  ...changeTodoMutation(),
  onSuccess: refetchTodos,
})

function toggleTodoStatus(id: string, currentIsDone: boolean) {
  toggleTodoM.mutate({
    path: { id },
    body: {
      isDone: {
        value: !currentIsDone,
      },
    },
  })
}
//#endregion

//#region Editing
const editingSheetTodoId = ref<string | null>(null)
const isEditingSheetOpen = computed(() => editingSheetTodoId.value != null)
const editingSheetTodo = computed(() => {
  const todo = listTodosQ.data.value?.items.find((t) => t.id === editingSheetTodoId.value)

  return todo
})

function closeEditingSheet() {
  editingSheetTodoId.value = null
}

const editTodoTitleM = useMutation({
  ...changeTodoMutation(),
  onSuccess: () => {
    closeEditingSheet()
    refetchTodos()
  },
})

function openEditingSheet() {
  const currentTodoId = optionsSheetTodoId.value
  closeOptionsSheet()
  editingSheetTodoId.value = currentTodoId
}

function editTodoTitle(newRawTitle: string) {
  const id = editingSheetTodoId.value
  if (!id) return

  editTodoTitleM.mutate({
    path: { id },
    body: {
      rawTitle: {
        value: newRawTitle,
      },
    },
  })
}
//#endregion
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

      <template v-if="listTodosQ.status.value === 'success'">
        <TodosList
          @open-todo-menu="openOptionsSheet"
          @toggle-todo-status="toggleTodoStatus"
          :items="listTodosQ.data.value?.items ?? []"
        />
      </template>
      <template v-else-if="listTodosQ.status.value === 'pending'">
        <p class="p-4">Loading...</p>
      </template>
      <template v-else>
        <p class="p-4 text-red-400">Failed to load todos</p>
        <button :class="btn()" @click="refetchTodos">Retry</button>
      </template>
    </main>

    <TodoBottomSheet
      v-if="isOptionsSheetOpen"
      @close-sheet="closeOptionsSheet"
      @archive="archiveTodo"
      @edit="openEditingSheet"
    />

    <TodoFormSheet
      v-if="isEditingSheetOpen"
      :initial-title="editingSheetTodo!.rawTitle"
      @close-sheet="closeEditingSheet"
      @submit="editTodoTitle"
    />
  </div>
</template>
