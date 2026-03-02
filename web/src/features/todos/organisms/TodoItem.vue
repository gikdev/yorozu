<script setup lang="ts">
import { EnergyLevel, type TodoResponse } from '#/common/api/client'
import { PhCheckCircle, PhCircle, PhDotsThree } from '@phosphor-icons/vue'

const props = defineProps<{
  task: TodoResponse
  isLoading: boolean
}>()

const emit = defineEmits<{
  toggleStatus: [id: string, currentIsDone: boolean]
  openMenu: [id: string]
}>()

function formatEnergyLevel(energyLevel: EnergyLevel) {
  switch (energyLevel) {
    case EnergyLevel.NONE:
      return null
    case EnergyLevel.LOW:
      return '$'
    case EnergyLevel.MEDIUM:
      return '$$'
    case EnergyLevel.HIGH:
      return '$$$'
  }
}
</script>

<template>
  <div class="flex items-center gap-3 p-3" :class="task.isDone && 'opacity-50'">
    <button :disabled="isLoading" @click="emit('toggleStatus', task.id, task.isDone)"
      class="cursor-pointer disabled:cursor-not-allowed">
      <PhCheckCircle v-if="task.isDone" size="32" weight="fill" />
      <PhCircle v-else size="32" />
    </button>

    <div class="flex-1 min-w-0">
      <p class="flex-1 flex gap-2 flex-wrap">
        <span v-if="task.isImportant" class="">⭐</span>
        <span v-if="task.isUrgent">❗</span>
        <span class="text-base">{{ task.title }}</span>
        <span v-if="task.context" class="text-amber-500"> @{{ task.context }} </span>
        <span v-if="task.project" class="text-emerald-500"> +{{ task.project }} </span>
        <span v-if="task.tag" class="text-sky-500"> #{{ task.tag }} </span>
        <span v-if="task.time" class="text-lime-500"> ~{{ task.time }} </span>
        <span v-if="task.energy" class="text-purple-500">{{ formatEnergyLevel(task.energy) }}</span>
      </p>
    </div>

    <button :disabled="isLoading" @click="emit('openMenu', task.id)" class="cursor-pointer disabled:cursor-not-allowed">
      <PhDotsThree size="32" />
    </button>
  </div>
</template>
