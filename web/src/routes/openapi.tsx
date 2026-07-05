import {
  type AnyApiReferenceConfiguration,
  ApiReferenceReact,
} from '@scalar/api-reference-react'
import { createFileRoute } from '@tanstack/react-router'
import '@scalar/api-reference-react/style.css'
import openApiSpec from '../common/api/openapi.yaml?raw'

export const Route = createFileRoute('/openapi')({
  component: RouteComponent,
})

const config: AnyApiReferenceConfiguration = {
  content: openApiSpec,
}

function RouteComponent() {
  return <ApiReferenceReact configuration={config} />
}
