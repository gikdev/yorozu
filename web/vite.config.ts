import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type PluginOption, type UserConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import tsconfigPaths from 'vite-tsconfig-paths'

const vitePwaPlugin = VitePWA({
  registerType: 'prompt',
  injectRegister: false,

  pwaAssets: {
    disabled: false,
    config: './vite-pwa-assets.config.ts',
  },

  manifest: {
    id: 'ir.bahrami85.yorozu',
    name: 'Yorozu',
    short_name: 'Yorozu',
    description: 'A super app.',
    theme_color: '#0284C7',
  },

  workbox: {
    globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2,ttf}'],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  },

  devOptions: {
    enabled: false,
    navigateFallback: 'index.html',
    suppressWarnings: true,
    type: 'module',
  },
})

const router = tanstackRouter({
  autoCodeSplitting: false,
  generatedRouteTree: './src/app/routing/route-tree.gen.ts',
  target: 'react',
  quoteStyle: 'double',
  semicolons: false,
})

const plugins: PluginOption[] = [
  tsconfigPaths(),
  react(),
  tailwindcss(),
  router,
  vitePwaPlugin,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]

const server: UserConfig['server'] = {
  port: 5398,
  proxy: {
    '/api': {
      target: 'http://localhost:5050',
      changeOrigin: true,
      secure: false,
    },
  },
}

const resolve: UserConfig['resolve'] = {
  alias: {
    '#': path.resolve(__dirname, 'src'),
  },
}

export default defineConfig({
  plugins,
  server,
  resolve,
})
