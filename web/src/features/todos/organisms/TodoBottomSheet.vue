<script lang="ts" setup>
import { btn } from '#/common/atoms/btn'
import BottomSheet from '#/common/molecules/BottomSheet.vue'
import { PhArchive, PhPencilLine } from '@phosphor-icons/vue'

const emit = defineEmits<{
  closeSheet: []
  edit: []
  archive: []
}>()

const closeSheet = () => emit('closeSheet')
const editTodo = () => emit('edit')
const archiveTodo = () => emit('archive')
</script>

<template>
  <BottomSheet @close-sheet="closeSheet">
    <button :class="btn()" @click="editTodo">
      <PhPencilLine :size="24" />
      <span>Edit</span>
    </button>

    <button :class="btn()" @click="archiveTodo">
      <PhArchive :size="24" />
      <span>Archive</span>
    </button>
  </BottomSheet>
</template>
