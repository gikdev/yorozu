<script setup lang="ts">
import type { TodoResponse } from '#/common/api/client'
import { PhCheckSquare, PhSquare } from '@phosphor-icons/vue'

const props = defineProps<{
  task: TodoResponse
  isLoading: boolean
}>()

const emit = defineEmits<{
  toggleStatus: [id: string]
}>()
</script>

<template>
  <div class="flex items-center gap-3 p-3">
    <button @click="emit('toggleStatus', task.id)" :disabled="isLoading"
      class="cursor-pointer disabled:cursor-not-allowed">
      <PhCheckSquare v-if="task.isDone" size="32" weight="fill" class="opacity-50" />
      <PhSquare v-else size="32" />
    </button>

    <div class="flex-1 min-w-0">
      <p class="flex-1 flex gap-2 flex-wrap" :class="task.isDone && 'opacity-50'">
        <span v-if="task.isImportant" class="">⭐</span>
        <span v-if="task.isUrgent">❗</span>
        <span class="text-base">{{ task.title }}</span>
        <span v-if="task.context" class="text-amber-500"> @{{ task.context }} </span>
        <span v-if="task.project" class="text-emerald-500"> +{{ task.project }} </span>
        <span v-if="task.tag" class="text-sky-500"> #{{ task.tag }} </span>
        <span v-if="task.time" class="text-lime-500"> ~{{ task.time }} </span>
        <span v-if="task.energy" class="text-purple-500">{{ task.energy }}</span>
      </p>
    </div>
  </div>
</template>
