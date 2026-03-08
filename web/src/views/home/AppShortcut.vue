<script lang="ts" setup>
import type { AppShortcut } from './app-shortcut'

const props = defineProps<{
  shortcut: AppShortcut
}>()
</script>

<template>
  <RouterLink :to="shortcut.url" class="flex flex-col items-center gap-2">
    <div class="bg-slate-500 p-2 aspect-square max-w-max rounded-md">
      <component :is="shortcut.Icon" weight="fill" size="24" />
    </div>

    <p>{{ shortcut.name }}</p>
  </RouterLink>
</template>
