<script setup lang="ts">
import type { TodoResponse } from '#/common/api/generated/client-dev'
import TodoItem from '../organisms/TodoItem.vue'

defineProps<{
  items: TodoResponse[]
}>()
</script>

<template>
  <div class="flex flex-col overflow-y-auto gap-2">
    <TodoItem v-for="item in items" :is-loading="false" :key="item.id" :task="item" />
  </div>
</template>
