import { Link } from '@tanstack/react-router'

export const TempWelcomeScreen = () => (
  <div className='font-main min-h-screen flex items-center justify-center bg-mist-950 px-4 py-8 text-mist-400'>
    <Link
      to='/apps'
      className='text-mist-100 font-bold text-5xl border-2 border-mist-900 hover:border-mist-800 cursor-pointer p-8 rounded-xl group flex flex-col items-center text-center transition-all hover:opacity-100 opacity-50'
    >
      お帰り、スペク
    </Link>
  </div>
)
