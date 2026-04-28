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
          "list-none cursor-pointer select-none rounded-full border-4 border-black bg-white pr-3 text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FFD93D] hover:text-black",
        )}
      >
        <Avatar className="h-8 w-8 border-4 border-black bg-[#C4B5FD]">
          <AvatarImage alt={user?.name || "Learner"} src={user?.photoURL || ""} />
          <AvatarFallback className="bg-[#C4B5FD] font-black text-black">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
        <span className="hidden text-sm font-black uppercase md:inline">{user?.name || "Learner"}</span>
        <ChevronDown className="h-4 w-4 text-black transition group-open:rotate-180" />
      </summary>

      <div className="absolute right-0 z-50 mt-2 w-56 border-4 border-black bg-[#FFFDF5] p-2 text-black shadow-[8px_8px_0px_0px_#000]">
        <div className="border-b-4 border-black px-3 py-3">
          <p className="text-sm font-black uppercase text-black">{user?.name || "Learner"}</p>
          <p className="text-xs font-bold text-black">{user?.email || "mira@example.com"}</p>
        </div>

        <Link
          className="mt-2 flex items-center gap-3 border-4 border-transparent px-3 py-2 text-sm font-bold uppercase text-black transition hover:border-black hover:bg-[#FFD93D] hover:shadow-[4px_4px_0px_0px_#000]"
          to="/dashboard/profile"
        >
          <UserRound className="h-4 w-4" />
          Profile
        </Link>

        {isPreviewMode ? (
          <div className="px-3 py-2 text-sm font-bold text-black">
            Dashboard preview mode is active.
          </div>
        ) : (
          <button
            className="flex w-full items-center gap-3 border-4 border-transparent px-3 py-2 text-left text-sm font-bold uppercase text-black transition hover:border-black hover:bg-[#FF6B6B] hover:shadow-[4px_4px_0px_0px_#000]"
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
