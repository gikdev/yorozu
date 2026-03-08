<script lang="ts" setup>
const props = defineProps<{
  version: number
}>()
</script>

<template>
  <header class="flex flex-col items-center gap-2">
    <img src="/fanoos.png" class="size-16 rounded-md" />

    <p class="flex gap-1 items-center">
      <span class="text-2xl font-bold text-sky-500">Fanoos</span>
      <sup>v{{ version }}</sup>
    </p>
  </header>
</template>
