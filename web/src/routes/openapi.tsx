import { ApiReferenceReact } from '@scalar/api-reference-react'
import { createFileRoute } from '@tanstack/react-router'
import '@scalar/api-reference-react/style.css'
import openApiSpec from '../common/api/openapi.yaml?raw'

const content = openApiSpec

export const Route = createFileRoute('/openapi')({
  component: () => <ApiReferenceReact configuration={{ content }} />,
})
