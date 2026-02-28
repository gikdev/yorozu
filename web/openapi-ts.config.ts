import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  // input: './src/common/api/openapi.yaml',
  input: './src/common/api/dev.openapi.yaml',
  output: {
    // path: './src/common/api/generated/client',
    path: './src/common/api/generated/client-dev',
    postProcess: ['oxfmt', 'oxlint', 'eslint'],
  },
  plugins: [
    { name: '@hey-api/client-axios', baseUrl: '/', includeInEntry: true },
    { name: '@hey-api/typescript', enums: 'javascript', includeInEntry: true },
    {
      name: '@hey-api/sdk',
      operations: { strategy: 'byTags' },
      transformer: false,
      includeInEntry: true,
    },
    { name: '@pinia/colada', includeInEntry: true },
  ],
})
