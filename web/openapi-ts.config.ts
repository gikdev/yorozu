import { defineConfig } from '@hey-api/openapi-ts'

type ApiType = "mock" | "real"

const apiType: ApiType = "real"
// const apiType: ApiType = "mock"

const input = `./src/common/api/${apiType}.openapi.yaml`
const path = `./src/common/api/generated/client/${apiType}`

export default defineConfig({
  input,
  output: {
    path,
    postProcess: ['oxfmt', 'oxlint', 'eslint'],
  },
  plugins: [
    { name: '@hey-api/client-axios', baseUrl: '/', includeInEntry: true },
    { name: '@hey-api/typescript', enums: 'javascript', includeInEntry: true },
    { name: 'valibot', includeInEntry: true },
    {
      name: '@hey-api/sdk',
      operations: { strategy: 'byTags' },
      transformer: false,
      includeInEntry: true,
    },
    { name: '@pinia/colada', includeInEntry: true },
  ],
})
