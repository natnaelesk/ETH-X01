import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTASection() {
  return (
    <section className="mt-20 text-center">
      <div className="rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_38%)] px-6 py-14 sm:px-8">
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Practice DSA daily, follow weekly tracks, and build stronger coding foundations.
        </h2>
        <Link
          className={cn(
            buttonVariants(),
            "mt-8 h-11 rounded-xl bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
          )}
          to="/signup"
        >
          Create Account
        </Link>
      </div>
    </section>
  );
}
