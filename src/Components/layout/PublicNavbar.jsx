import { Link } from 'react-router-dom'
// import { buttonVariants } from '../ui/button-variants'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features', anchor: true },
  { label: 'Login', href: '/login' },
]

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link className="flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-white" to="/">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-indigo-300 shadow-lg shadow-black/20">
            E
          </span>
          <span>{'ETH-X01'}</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            item.anchor ? (
              <a
                key={item.label}
                className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                to={item.href}
              >
                {item.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
            to="/signup"
          >
            Start free
          </Link>
        </div>
      </div>
    </header>
  )
}
