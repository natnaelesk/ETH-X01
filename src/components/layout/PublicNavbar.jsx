import { Link } from "react-router-dom";
import { Menu, Home, Sparkles, Settings, LogIn } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Features", href: "#features", anchor: true, icon: Sparkles },
  { label: "How it works", href: "#how-it-works", anchor: true, icon: Settings },
];

export function PublicNavbar({ user = null }) {
  const isLoggedIn = Boolean(user);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-white">
            E
          </div>
          <span className="text-sm font-semibold tracking-widest text-white">
            ETH-X01
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.anchor ? (
              <a
                key={item.label}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="rounded-xl px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/5 rounded-xl"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[88vw] max-w-sm bg-black text-white border-white/10 p-0"
          >
            {/* Header */}
            <div className="px-5 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-white/10 flex items-center justify-center">
                  E
                </div>
                <p className="text-sm font-semibold">ETH-X01</p>
              </div>
            </div>

            {/* Nav */}
            <div className="px-3 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return item.anchor ? (
                  <SheetClose asChild key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition"
                    >
                      <Icon className="h-4 w-4 opacity-70" />
                      {item.label}
                    </a>
                  </SheetClose>
                ) : (
                  <SheetClose asChild key={item.label}>
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition"
                    >
                      <Icon className="h-4 w-4 opacity-70" />
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>

            {/* Actions */}
            <div className="mt-auto px-3 pb-6 pt-4 border-t border-white/10 flex flex-col gap-2">
              {isLoggedIn ? (
                <SheetClose asChild>
                  <Link
                    to="/dashboard"
                    className="rounded-xl bg-white text-black px-4 py-3 text-center text-sm font-medium hover:bg-white/90 transition"
                  >
                    Dashboard
                  </Link>
                </SheetClose>
              ) : (
                <>
                  <SheetClose asChild>
                    <Link
                      to="/login"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      to="/signup"
                      className="rounded-xl bg-white text-black px-4 py-3 text-center text-sm font-semibold hover:bg-white/90 transition"
                    >
                      Sign up
                    </Link>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
