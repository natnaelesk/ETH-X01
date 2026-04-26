import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

function getInitials(name = "Learner") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserMenu({ user, onLogout }) {
  const isPreviewMode = !onLogout;

  return (
    <details className="group relative">
      <summary
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "list-none cursor-pointer select-none rounded-full border border-white/10 bg-white/[0.03] pr-3 text-white hover:bg-white/6 hover:text-white",
        )}
      >
        <Avatar className="h-8 w-8 border border-white/10 bg-white/[0.06]">
          <AvatarImage alt={user?.name || "Learner"} src={user?.photoURL || ""} />
          <AvatarFallback className="bg-white/[0.08] text-white/80">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-medium md:inline">{user?.name || "Learner"}</span>
        <ChevronDown className="h-4 w-4 text-white/45 transition group-open:rotate-180" />
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-white/10 bg-black/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <div className="border-b border-white/10 px-3 py-3">
          <p className="text-sm font-medium text-white">{user?.name || "Learner"}</p>
          <p className="text-xs text-white/45">{user?.email || "mira@example.com"}</p>
        </div>

        <Link
          className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
          to="/dashboard/profile"
        >
          <UserRound className="h-4 w-4" />
          Profile
        </Link>

        {isPreviewMode ? (
          <div className="rounded-xl px-3 py-2 text-sm text-white/55">
            Dashboard preview mode is active.
          </div>
        ) : (
          <button
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            onClick={onLogout}
            type="button"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        )}
      </div>
    </details>
  );
}
