import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/app/useAuth";
import { cn } from "@/lib/utils";

const navLinkBase =
  "neo-focus-ring border-4 border-transparent px-3 py-2 text-sm font-bold uppercase tracking-[0.14em] transition";

const navLinkActive = "border-black bg-[#FFD93D] shadow-[4px_4px_0px_0px_#000]";
const navLinkIdle = "text-black hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]";

export function PublicNavbar({ user = null }) {
  const auth = useAuth();
  const sessionUser = user ?? auth.user;
  const isLoggedIn = Boolean(sessionUser);

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
          <NavLink
            className={({ isActive }) =>
              cn(navLinkBase, isActive ? navLinkActive : navLinkIdle)
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              cn(navLinkBase, isActive ? navLinkActive : navLinkIdle)
            }
            to="/discussion"
          >
            Discussion
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(navLinkBase, navLinkIdle, "inline-flex items-center gap-2")}
                type="button"
              >
                Challenges
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="neo-scope w-64 border-4 border-black bg-[#FFFDF5] p-2 shadow-[8px_8px_0px_0px_#000]"
            >
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  className="border-4 border-transparent font-bold uppercase tracking-[0.12em] text-black hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]"
                  to="/leetcode"
                >
                  LeetCode Challenges
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link
                  className="border-4 border-transparent font-bold uppercase tracking-[0.12em] text-black hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]"
                  to="/python-crash-course"
                >
                  Python Crash Course
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="neo-button-ghost neo-focus-ring" type="button">
                  <User className="h-4 w-4" />
                  Profile
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="neo-scope w-56 border-4 border-black bg-[#FFFDF5] p-2 shadow-[8px_8px_0px_0px_#000]"
              >
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link
                    className="border-4 border-transparent font-bold uppercase tracking-[0.12em] text-black hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]"
                    to="/profile"
                  >
                    View profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2 h-[4px] bg-black opacity-100" />
                <DropdownMenuItem
                  className="cursor-pointer border-4 border-transparent font-bold uppercase tracking-[0.12em] text-black hover:border-black hover:bg-[#FF6B6B] hover:shadow-[4px_4px_0px_0px_#000]"
                  onSelect={(event) => {
                    event.preventDefault();
                    auth.logout();
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  cn(navLinkBase, isActive ? navLinkActive : navLinkIdle)
                }
                to="/login"
              >
                Login
              </NavLink>
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
              <SheetClose asChild>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "neo-focus-ring border-4 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition",
                      isActive ? "border-black bg-[#FFD93D] shadow-[4px_4px_0px_0px_#000]" : "border-transparent hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]",
                    )
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </SheetClose>

              <SheetClose asChild>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "neo-focus-ring border-4 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition",
                      isActive ? "border-black bg-[#FFD93D] shadow-[4px_4px_0px_0px_#000]" : "border-transparent hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]",
                    )
                  }
                  to="/discussion"
                >
                  Discussion
                </NavLink>
              </SheetClose>

              <div className="mt-3 border-t-4 border-black pt-3">
                <p className="px-4 text-[11px] font-black uppercase tracking-[0.22em] text-black">
                  Challenges
                </p>
                <div className="mt-2 flex flex-col gap-1">
                  <SheetClose asChild>
                    <NavLink
                      className={({ isActive }) =>
                        cn(
                          "neo-focus-ring border-4 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition",
                          isActive ? "border-black bg-[#C4B5FD] shadow-[4px_4px_0px_0px_#000]" : "border-transparent hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]",
                        )
                      }
                      to="/leetcode"
                    >
                      LeetCode Challenges
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <NavLink
                      className={({ isActive }) =>
                        cn(
                          "neo-focus-ring border-4 px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition",
                          isActive ? "border-black bg-[#C4B5FD] shadow-[4px_4px_0px_0px_#000]" : "border-transparent hover:border-black hover:bg-white hover:shadow-[4px_4px_0px_0px_#000]",
                        )
                      }
                      to="/python-crash-course"
                    >
                      Python Crash Course
                    </NavLink>
                  </SheetClose>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t-4 border-black px-3 pb-6 pt-4">
              {isLoggedIn ? (
                <>
                  <SheetClose asChild>
                    <Link to="/profile" className="neo-button-secondary neo-focus-ring text-center">
                      View profile
                    </Link>
                  </SheetClose>
                  <button
                    className="neo-button-ghost neo-focus-ring"
                    onClick={() => auth.logout()}
                    type="button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Link
                      to="/login"
                      className="neo-button-ghost neo-focus-ring"
                    >
                      Login
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
