import { ArrowLeft, BookOpenText, CheckCircle2, Sparkles, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

const highlights = [
  {
    icon: BookOpenText,
    title: 'Structured learning paths',
    description: 'Progress through DSA and Python with clear milestones, visible progress, and big visual cues.',
  },
  {
    icon: Trophy,
    title: 'Momentum you can measure',
    description: 'Track streaks, completed challenges, and leaderboard position over time.',
  },
  {
    icon: CheckCircle2,
    title: 'Built for focus',
    description: 'Thick borders, hard shadows, and fast interactions keep the experience deliberate.',
  },
]

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

        <div className="grid flex-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="neo-panel relative overflow-hidden bg-[#FFD93D] p-8 lg:p-10">
            <div className="neo-grid-bg absolute inset-0 opacity-25" />
            <div className="pointer-events-none absolute right-6 top-6 h-16 w-16 rotate-12 border-4 border-black bg-[#FF6B6B]" />
            <div className="pointer-events-none absolute bottom-8 left-8 h-10 w-10 -rotate-12 border-4 border-black bg-[#C4B5FD]" />
            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="neo-kicker inline-flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Developer learning workspace
                </div>
                <div className="space-y-3">
                  <h1 className="neo-display max-w-xl text-3xl md:text-5xl">
                    {title}
                  </h1>
                  <p className="max-w-2xl text-sm font-bold leading-7 text-black md:text-base">
                    {description}
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                {highlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="border-4 border-black bg-white p-5 shadow-[6px_6px_0px_0px_#000]">
                      <div className="flex items-start gap-4">
                        <div className="border-4 border-black bg-[#C4B5FD] p-3 text-black shadow-[4px_4px_0px_0px_#000]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h2 className="text-sm font-black uppercase text-black">{item.title}</h2>
                          <p className="text-sm font-bold leading-6 text-black">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="flex items-center justify-center">
            {children}
          </section>
        </div>
      </div>
    </div>
  )
}
