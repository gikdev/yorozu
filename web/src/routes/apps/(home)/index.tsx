import { createFileRoute } from "@tanstack/react-router"
import { version } from "#/app/data/version.json"
import { appShortcuts } from "./-appShortcuts"
import { AppShortcut } from "./-AppShortcut"

export const Route = createFileRoute("/apps/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-mist-950 min-h-dvh text-mist-400 flex flex-col items-center justify-center gap-8 px-2 py-8 max-w-240 mx-auto">
      <div className="flex flex-col items-center gap-1">
        <img src="/yorozu.png" className="size-12 rounded-md" />
        <code className="text-xs">v{version}</code>
      </div>

      <div className="gap-2 max-w-5xl w-full flex items-center justify-center flex-wrap">
        {appShortcuts.map(shortcut => (
          <AppShortcut shortcut={shortcut} key={shortcut.id} />
        ))}
      </div>
    </div>
  )
}
