import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DashboardPreview } from "../components/DashboardPreview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.14),transparent_32%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.32em] text-white/55">
          Developer Workspace
        </p>

        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[0.94] tracking-tight text-white sm:text-5xl lg:text-[4.8rem]">
          <span className="text-2xl md:text-5xl"> Master DSA with structured practice, </span> <br /> <span className="text-2xl md:text-4xl"> daily challenges, and real progress tracking. </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/60 sm:text-lg">
          Follow weekly topics, solve daily problems, compete on leaderboards,
          and build strong coding fundamentals - all in one place.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            className={cn(
              buttonVariants(),
              "h-11 rounded-xl bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
            )}
            to="/signup"
          >
            Start Building
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-xl border-white/10 bg-white/[0.02] px-5 text-sm font-medium text-white/82 hover:bg-white/5 hover:text-white"
            )}
            href="#features"
          >
            Explore Features
          </a>
        </div>
      </div>

      <div className="relative mt-20 lg:mt-10 ">
        <DashboardPreview />
      </div>
    </section>
  );
}
