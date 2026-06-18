import { createFileRoute } from "@tanstack/react-router"
import { version } from "#/app/data/version.json"
import { appShortcuts } from "./-appShortcuts"
import { AppShortcut } from "./-AppShortcut"
import { fullPage } from "#/common/atoms/full-page"

export const Route = createFileRoute("/apps/(home)/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div
      className={fullPage({
        className: "items-center justify-center gap-8 p-2",
      })}
    >
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
