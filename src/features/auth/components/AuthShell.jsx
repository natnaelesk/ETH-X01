import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function AuthShell({ title, description, children }) {
  return (
    <div className="neo-scope neo-grid-bg neo-noise-bg min-h-screen text-black">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 md:px-6 lg:py-6">
        <div className="neo-panel mb-4 flex items-center justify-between bg-white px-4 py-3">
          <Link className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-black" to="/">
            <span className="flex h-10 w-10 items-center justify-center border-4 border-black bg-[#FF6B6B] text-black shadow-[4px_4px_0px_0px_#000]">
              E
            </span>
            <span>ETH-X01</span>
          </Link>

          <Link className="neo-button-ghost hidden md:inline-flex" to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center py-4">
          <section className="w-full max-w-lg space-y-3">
            <div className="neo-panel bg-[#FFD93D] px-6 py-5">
              <h1 className="neo-display text-3xl md:text-4xl">{title}</h1>
              <p className="mt-2 text-sm font-bold text-black">{description}</p>
            </div>
            {children}
          </section>
        </div>
      </div>
    </div>
  )
}
