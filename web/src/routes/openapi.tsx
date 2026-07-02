import { createFileRoute } from "@tanstack/react-router"
import {
  ApiReferenceReact,
  type AnyApiReferenceConfiguration,
} from "@scalar/api-reference-react"
import "@scalar/api-reference-react/style.css"
import openApiSpec from "../common/api/openapi.yaml?raw"

export const Route = createFileRoute("/openapi")({
  component: RouteComponent,
})

const config: AnyApiReferenceConfiguration = {
  content: openApiSpec,
}

function RouteComponent() {
  return <ApiReferenceReact configuration={config} />
}
