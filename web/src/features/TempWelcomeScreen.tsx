import { Link } from "@tanstack/react-router"

export const TempWelcomeScreen = () => (
  <div className="font-main min-h-screen flex items-center justify-center bg-mist-950 px-4 py-8 text-mist-400">
    <Link to="/apps" className="text-mist-100 font-bold text-5xl hover:bg-mist-900 cursor-pointer p-8 rounded-xl group">
      <span className="inline-block group-hover:hidden [writing-mode:vertical-rl]">お帰り、スペク。</span>
      <span className="hidden group-hover:inline-block">Visit Apps</span>
    </Link>
  </div>
)
