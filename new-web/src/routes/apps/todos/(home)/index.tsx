import { createFileRoute } from '@tanstack/react-router';
import { Header } from './-header';

export const Route = createFileRoute('/apps/todos/(home)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="bg-mist-900 min-h-dvh text-mist-300 flex flex-col">
      <Header />

    </div>
  )
}
