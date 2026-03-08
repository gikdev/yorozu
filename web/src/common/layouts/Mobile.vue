<script lang="ts" setup>
import { computed } from 'vue'
import { base } from './base'
import { cn } from 'tailwind-variants'

type Props = {
  class?: string
}

const props = defineProps<Props>()

const baseClass = computed(() =>
  cn('max-w-160 mx-auto bg-slate-900 h-dvh text-white flex flex-col', props.class),
)
</script>

<template>
  <div :class="baseClass">
    <slot />
  </div>
</template>
