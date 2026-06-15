import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "./src/common/api/openapi.yaml",
  output: "./src/common/api/generated/client",
  plugins: [
    {
      name: "@hey-api/client-axios",
      baseUrl: "/",
      includeInEntry: true,
    },
    {
      name: "@hey-api/typescript",
      enums: "javascript",
      includeInEntry: true,
    },
    { name: "zod", includeInEntry: true },
    {
      name: "@hey-api/sdk",
      operations: { strategy: "byTags" },
      transformer: false,
      includeInEntry: true,
    },
    { name: "@tanstack/react-query", includeInEntry: true },
  ],
})
