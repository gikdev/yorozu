<script lang="ts" setup>
import { btn } from '#/common/atoms/btn'
import { input } from '#/common/atoms/input'
import BottomSheet from '#/common/molecules/BottomSheet.vue'
import { ref } from 'vue'

const props = defineProps<{
  initialTitle: string
}>()

const todoTitle = ref(props.initialTitle)

const emit = defineEmits<{
  submit: [newRawTitle: string]
  closeSheet: []
}>()
</script>

<template>
  <BottomSheet @close-sheet="emit('closeSheet')">
    <textarea type="text" v-model="todoTitle" :class="input()" />
    <button :class="btn()" @click="emit('submit', todoTitle)">Submit</button>
  </BottomSheet>
</template>
