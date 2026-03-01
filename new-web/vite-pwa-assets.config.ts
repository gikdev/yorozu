import { defineConfig, minimal2023Preset as preset } from "@vite-pwa/assets-generator/config"

export default defineConfig({
  preset,
  headLinkOptions: {
    preset: "2023",
  },
  images: ["public/fanoos.svg"],
})
