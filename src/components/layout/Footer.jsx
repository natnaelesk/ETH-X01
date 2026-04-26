import { ArrowUpRight, Globe, Mail, Network } from "lucide-react";
import { Link } from "react-router-dom";

import { brand } from "@/features/marketing/data/marketingData";

const productLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Daily practice", href: "#product-preview" },
];

const accountLinks = [
  { label: "Login", to: "/login" },
  { label: "Signup", to: "/signup" },
];

const contactLinks = [
  { label: "hello@ethx01.dev", href: "mailto:hello@ethx01.dev", icon: Mail },
  { label: "GitHub", href: "https://github.com", icon: Globe },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Network },
];

export function Footer() {
  return (
    <footer className="mt-20">
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-32 w-32 rounded-full bg-white/6 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.45fr_0.9fr_0.8fr_1fr]">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-white/40">
              {brand.name}
            </p>
            <h2 className="mt-4 max-w-[11ch] text-3xl font-medium tracking-[-0.05em] text-white sm:text-[2.6rem] sm:leading-[1]">
              Build consistency. Ship stronger problem-solving skills.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-white/58 sm:text-base">
              {brand.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Start Building
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/78 transition hover:bg-white/6 hover:text-white"
              >
                Explore Platform
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-white">Product</p>
            <div className="mt-5 space-y-3 text-sm text-white/55">
              {productLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-white">Account</p>
            <div className="mt-5 space-y-3 text-sm text-white/55">
              {accountLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-white">Connect</p>
            <div className="mt-5 space-y-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 text-sm text-white/55 transition hover:text-white"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>Designed for focused DSA practice and visible progress.</p>
          <p>© 2026 {brand.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
