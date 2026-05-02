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
      <div className="neo-panel relative overflow-hidden bg-[#FFD93D] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="neo-dots-bg pointer-events-none absolute inset-0 opacity-20" />
        <div className="pointer-events-none absolute -right-10 top-6 h-24 w-24 rotate-12 border-4 border-black bg-[#FF6B6B]" />
        <div className="pointer-events-none absolute bottom-6 left-10 h-16 w-16 -rotate-12 border-4 border-black bg-white" />

        <div className="relative grid gap-10 lg:grid-cols-[1.45fr_0.9fr_0.8fr_1fr]">
          <div className="max-w-xl">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-black">
              {brand.name}
            </p>
            <h2 className="neo-display mt-4 max-w-[11ch] text-3xl sm:text-[2.9rem]">
              Build consistency. Ship stronger problem-solving skills.
            </h2>
            <p className="mt-4 max-w-md text-sm font-bold leading-7 text-black sm:text-base">
              {brand.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/signup"
                className="neo-button"
              >
                Start Building
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="neo-button-ghost"
              >
                Explore Platform
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-black">Product</p>
            <div className="mt-5 space-y-3 text-sm font-bold text-black">
              {productLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="inline-block border-b-4 border-transparent transition hover:border-black"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-black">Account</p>
            <div className="mt-5 space-y-3 text-sm font-bold text-black">
              {accountLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="inline-block border-b-4 border-transparent transition hover:border-black"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-black">Connect</p>
            <div className="mt-5 space-y-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 text-sm font-bold text-black transition hover:-translate-y-0.5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border-4 border-black bg-white text-black shadow-[4px_4px_0px_0px_#000]">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex flex-col gap-4 border-t-4 border-black pt-6 text-sm font-bold text-black sm:flex-row sm:items-center sm:justify-between">
          <p>Designed for focused DSA practice and visible progress.</p>
          <p>© 2026 {brand.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
