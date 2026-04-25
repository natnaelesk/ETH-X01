import { Link } from "react-router-dom";

import { brand } from "../data/marketingData";

export function FooterSection() {
  return (
    <footer className="mt-16 border-t border-white/10 pt-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.28em] text-white">
            {brand.name}
          </p>
          <p className="mt-3 max-w-lg text-sm leading-7 text-white/50">
            Structured DSA practice, daily challenges, leaderboards, and Python fundamentals in one focused workspace.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
          <Link to="/login" className="transition hover:text-white">
            Login
          </Link>
          <Link to="/signup" className="transition hover:text-white">
            Signup
          </Link>
        </nav>
      </div>
    </footer>
  );
}
