<script setup lang="ts">
import type { TodoResponse } from '#/common/api/client'
import TodoItem from '../organisms/TodoItem.vue'

defineProps<{
  items: TodoResponse[]
}>()

const emit = defineEmits<{
  toggleTodoStatus: [id: string, currentIsDone: boolean]
  openTodoMenu: [id: string]
}>()

const reEmitToggle = (id: string, currentIsDone: boolean) => {
  emit('toggleTodoStatus', id, currentIsDone)
}

const handleOpenMenu = (id: string) => {
  emit('openTodoMenu', id)
}
</script>

<template>
  <div class="flex flex-col overflow-y-auto gap-2">
    <TodoItem
      @open-menu="handleOpenMenu"
      @toggle-status="reEmitToggle"
      v-for="item in items"
      :is-loading="false"
      :key="item.id"
      :task="item"
    />
  </div>
</template>
