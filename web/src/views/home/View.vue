<script lang="ts" setup>
import Mobile from '#/common/layouts/Mobile.vue'
import { version } from '#/app/data/version.json'
import { appShortcuts } from './app-shortcuts'
import Header from './Header.vue'
import AppShortcut from './AppShortcut.vue'
</script>

<template>
  <Mobile class="flex flex-col gap-4 py-4 px-8">
    <Header :version="version" />

    <main class="flex gap-2 justify-center">
      <AppShortcut v-for="shortcut in appShortcuts" :shortcut="shortcut" />
    </main>
  </Mobile>
</template>
