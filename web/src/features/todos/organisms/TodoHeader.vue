<script lang="ts" setup>
import { PhArchiveBox, PhCheckCircle } from '@phosphor-icons/vue'

const props = defineProps<{
  appVersion: number
  includeArchived: boolean
}>()

const emit = defineEmits<{
  toggleIncludeArchived: []
}>()
</script>

<template>
  <header class="flex gap-2 items-center py-4 px-4">
    <img src="/fanoos.png" class="size-10 rounded-md" />
    <p class="text-2xl font-bold text-sky-500">Todo</p>
    <span class="text-slate-300">v{{ appVersion }}</span>

    <button
      class="flex gap-1 items-center cursor-pointer ms-auto"
      @click="emit('toggleIncludeArchived')"
    >
      <PhCheckCircle v-if="includeArchived" weight="fill" :size="24" />
      <PhArchiveBox v-else :size="24" />
      <span>Include Archived</span>
    </button>
  </header>
</template>
