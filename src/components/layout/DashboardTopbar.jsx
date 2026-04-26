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
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-4 md:px-6">
        <Button
          className="border border-white/10 bg-white/[0.03] text-white hover:bg-white/6 md:hidden"
          size="icon"
          variant="ghost"
          onClick={onOpenSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <Button
          className="hidden border border-white/10 bg-white/[0.03] text-white hover:bg-white/6 md:inline-flex"
          size="icon"
          variant="ghost"
          onClick={onToggleCollapse}
        >
          <PanelLeft className="h-4 w-4" />
        </Button>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{title}</p>
          <p className="truncate text-xs text-white/40">Focused learning workspace</p>
        </div>

        <div className="ml-auto">
          <UserMenu onLogout={onLogout} user={user} />
        </div>
      </div>
    </header>
  );
}
