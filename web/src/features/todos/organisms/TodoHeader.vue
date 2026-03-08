<script lang="ts" setup>
import { PhArchiveBox } from '@phosphor-icons/vue'

const props = defineProps<{
  includeArchived: boolean
}>()

const emit = defineEmits<{
  toggleIncludeArchived: []
}>()
</script>

<template>
  <header class="flex gap-2 items-center py-4 px-4">
    <RouterLink to="/" class="contents">
      <img src="/fanoos.png" class="size-10 rounded-md" />
      <p class="text-2xl font-bold text-sky-500">Todo</p>
    </RouterLink>

    <button
      :class="['flex gap-1 items-center cursor-pointer ms-auto', includeArchived && 'text-sky-500']"
      @click="emit('toggleIncludeArchived')"
    >
      <PhArchiveBox :weight="includeArchived ? 'fill' : 'regular'" :size="24" />
    </button>
  </header>
</template>
