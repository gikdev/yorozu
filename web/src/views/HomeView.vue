<script lang="ts" setup>
import Mobile from '#/common/layouts/Mobile.vue'
import { version } from '#/app/data/version.json'
import { PhCheckFat, PhCheckCircle } from '@phosphor-icons/vue'
import { RouterLink } from 'vue-router'

interface AppShortcut {
  id: string
  name: string
  Icon: any
  url: string
}

const appShortcuts: AppShortcut[] = [
  {
    id: 'old-todos',
    name: 'Old Todos',
    Icon: PhCheckCircle,
    url: '/todo',
  },
  {
    id: 'todos',
    name: 'Todos',
    Icon: PhCheckFat,
    url: '/apps/todos',
  },
]
</script>

<template>
  <Mobile class="flex flex-col gap-4 py-4 px-8">
    <header class="flex flex-col items-center gap-2">
      <img src="/fanoos.png" class="size-16 rounded-md" />

      <p class="flex gap-1 items-center">
        <span class="text-2xl font-bold text-sky-500">Fanoos</span>
        <sup>v{{ version }}</sup>
      </p>
    </header>

    <main class="flex gap-2 justify-center">
      <RouterLink
        v-for="shortcut in appShortcuts"
        :to="shortcut.url"
        class="flex flex-col items-center gap-2"
      >
        <div class="bg-slate-500 p-2 aspect-square max-w-max rounded-md">
          <component :is="shortcut.Icon" weight="fill" size="24" />
        </div>

        <p>{{ shortcut.name }}</p>
      </RouterLink>
    </main>
  </Mobile>
</template>
