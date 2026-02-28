<script lang="ts" setup>
const emit = defineEmits<{
  closeSheet: []
}>()

const closeSheet = () => {
  emit('closeSheet')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 bg-opacity-50 z-10" @click="closeSheet"></div>

  <div class="fixed bottom-0 min-h-20 left-0 right-0 bg-slate-900 z-20 border-t border-slate-600">
    <div class="flex justify-center p-2">
      <button
        @click="closeSheet"
        class="w-12 h-2 bg-slate-600 cursor-pointer rounded-full"
      ></button>
    </div>

    <div class="p-4 flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>
