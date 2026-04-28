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
    <header className="sticky top-0 z-40 border-b-4 border-black bg-[#FFFDF5]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border-4 border-black bg-[#FF6B6B] text-lg font-black text-black shadow-[4px_4px_0px_0px_#000]">
            E
          </div>
          <span className="text-sm font-black uppercase tracking-[0.28em] text-black">
            ETH-X01
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.anchor ? (
              <a
                key={item.label}
                href={item.href}
                className="neo-focus-ring border-4 border-transparent px-3 py-2 text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:border-black hover:bg-[#FFD93D] hover:shadow-[4px_4px_0px_0px_#000]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="neo-focus-ring border-4 border-transparent px-3 py-2 text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:border-black hover:bg-[#FFD93D] hover:shadow-[4px_4px_0px_0px_#000]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="neo-button-secondary neo-focus-ring"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="neo-focus-ring border-4 border-transparent px-3 py-2 text-sm font-bold uppercase tracking-[0.14em] text-black transition hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="neo-button neo-focus-ring"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="neo-focus-ring md:hidden border-4 border-black bg-[#FFD93D] text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FF6B6B]"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="neo-scope w-[88vw] max-w-sm border-l-4 border-black bg-[#FFFDF5] p-0 text-black"
          >
            <div className="border-b-4 border-black bg-[#C4B5FD] px-5 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border-4 border-black bg-[#FF6B6B] font-black shadow-[4px_4px_0px_0px_#000]">
                  E
                </div>
                <p className="text-sm font-black uppercase tracking-[0.28em]">ETH-X01</p>
              </div>
            </div>

            <div className="px-3 py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return item.anchor ? (
                  <SheetClose asChild key={item.label}>
                    <a
                      href={item.href}
                      className="neo-focus-ring flex items-center gap-3 border-4 border-transparent px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  </SheetClose>
                ) : (
                  <SheetClose asChild key={item.label}>
                    <Link
                      to={item.href}
                      className="neo-focus-ring flex items-center gap-3 border-4 border-transparent px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black transition hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]"
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t-4 border-black px-3 pb-6 pt-4">
              {isLoggedIn ? (
                <SheetClose asChild>
                  <Link
                    to="/dashboard"
                    className="neo-button-secondary neo-focus-ring text-center"
                  >
                    Dashboard
                  </Link>
                </SheetClose>
              ) : (
                <>
                  <SheetClose asChild>
                    <Link
                      to="/login"
                      className="neo-button-ghost neo-focus-ring"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      to="/signup"
                      className="neo-button neo-focus-ring text-center"
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
