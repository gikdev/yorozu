<script setup lang="ts">
import type { TodoResponse } from '#/common/api/client'
import TodoItem from '../organisms/TodoItem.vue'

defineProps<{
  items: TodoResponse[]
}>()

const emit = defineEmits<{
  toggleTodoStatus: [id: string, currentIsDone: boolean]
}>()

const reEmitToggle = (id: string, currentIsDone: boolean) => {
  emit('toggleTodoStatus', id, currentIsDone)
}
</script>

<template>
  <div class="flex flex-col overflow-y-auto gap-2">
    <TodoItem
      @toggleStatus="reEmitToggle"
      v-for="item in items"
      :is-loading="false"
      :key="item.id"
      :task="item"
    />
  </div>
</template>
