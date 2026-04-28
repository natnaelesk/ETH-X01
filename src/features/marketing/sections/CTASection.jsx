import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="mt-20 text-center">
      <div className="neo-panel relative overflow-hidden bg-[#C4B5FD] px-6 py-14 sm:px-8">
        <div className="neo-dots-bg pointer-events-none absolute inset-0 opacity-20" />
        <h2 className="neo-display relative mx-auto max-w-3xl text-3xl sm:text-5xl">
          Practice DSA daily, follow weekly tracks, and build stronger coding foundations.
        </h2>
        <Link className="neo-button relative mt-8 neo-focus-ring" to="/signup">
          Create Account
        </Link>
      </div>
    </section>
  );
}
