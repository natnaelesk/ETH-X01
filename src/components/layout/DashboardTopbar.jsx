import { Menu, PanelLeft } from "lucide-react";
import { Button } from "../ui/button";
import { UserMenu } from "./UserMenu";

export function DashboardTopbar({
  title,
  onOpenSidebar,
  onToggleCollapse,
  user,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-20 border-b-4 border-black bg-[#FFFDF5]">
      <div className="flex items-center gap-3 px-4 py-4 md:px-6">
        <Button
          className="border-4 border-black bg-[#FFD93D] text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#FF6B6B] md:hidden"
          size="icon"
          variant="ghost"
          onClick={onOpenSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <Button
          className="hidden border-4 border-black bg-[#FFD93D] text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#C4B5FD] md:inline-flex"
          size="icon"
          variant="ghost"
          onClick={onToggleCollapse}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        <div className="min-w-0">
          <p className="truncate text-sm font-black uppercase tracking-[0.18em] text-black">{title}</p>
          <p className="truncate text-xs font-bold text-black">Focused learning workspace</p>
        </div>

        <div className="ml-auto">
          <UserMenu onLogout={onLogout} user={user} />
        </div>
      </div>
    </header>
  );
}
