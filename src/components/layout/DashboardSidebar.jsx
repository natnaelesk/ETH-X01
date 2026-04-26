import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Gauge,
  Layers3,
  Trophy,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { label: 'Dashboard', href: '/dashboard', icon: Gauge },
  {
    label: 'Learning',
    items: [
      { label: 'DSA Topics', href: '/dashboard/dsa', icon: Layers3 },
      { label: 'Python Track', href: '/dashboard/python', icon: BookOpen },
    ],
  },
  {
    label: 'Practice',
    items: [{ label: 'Daily Challenges', href: '/dashboard/challenges', icon: CirclePlay }],
  },
  { label: 'Leaderboard', href: '/dashboard/leaderboard', icon: Trophy },
  { label: 'Profile', href: '/dashboard/profile', icon: UserRound },
]

function NavItem({ item, collapsed, onNavigate }) {
  const Icon = item.icon;

  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
          isActive
            ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
            : "text-white/55 hover:bg-white/5 hover:text-white",
          collapsed ? "md:justify-center md:px-0" : null,
        )
      }
      to={item.href}
      onClick={onNavigate}
    >
      <Icon className="h-4 w-4 shrink-0 text-white/55 transition group-hover:text-white" />
      <span className={cn(collapsed ? 'md:hidden' : null)}>{item.label}</span>
    </NavLink>
  );
}

export function DashboardSidebar({ collapsed, mobileOpen, onClose, onToggleCollapse }) {
  return (
    <>
      <button
        aria-label="Close sidebar"
        className={cn(
          "fixed inset-0 z-30 bg-black/80 backdrop-blur-sm transition-opacity md:hidden",
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        type="button"
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-[linear-gradient(180deg,rgba(8,8,8,0.96),rgba(14,14,14,0.98))] shadow-2xl shadow-black/40 backdrop-blur-xl transition-transform duration-300 md:sticky md:top-0 md:h-screen",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          collapsed ? "md:w-20" : "md:w-72",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
          <div className={cn("flex items-center gap-3", collapsed ? "md:justify-center" : null)}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
              E
            </div>
            <div className={cn("min-w-0", collapsed ? "md:hidden" : null)}>
              <p className="truncate text-sm font-semibold text-white">ETH-X01</p>
              <p className="truncate text-xs text-white/40">Learning console</p>
            </div>
          </div>

          <button
            aria-label="Toggle collapse"
            className="hidden rounded-xl border border-white/10 bg-white/[0.03] p-2 text-white/70 transition hover:bg-white/5 hover:text-white md:inline-flex"
            onClick={onToggleCollapse}
            type="button"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-4">
          <div className="space-y-1">
            <p className={cn("px-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35", collapsed ? "md:hidden" : null)}>
              Explore
            </p>
            <nav className="space-y-1">
              {navigation.map((group) =>
                group.items ? (
                  <div key={group.label} className="space-y-1">
                    <p className={cn("px-3 pt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35", collapsed ? "md:hidden" : null)}>
                      {group.label}
                    </p>
                    {group.items.map((item) => (
                      <NavItem
                        key={item.label}
                        collapsed={collapsed}
                        item={item}
                        onNavigate={onClose}
                      />
                    ))}
                  </div>
                ) : (
                  <NavItem
                    key={group.label}
                    collapsed={collapsed}
                    item={group}
                    onNavigate={onClose}
                  />
                ),
              )}
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className={cn("rounded-2xl border border-white/10 bg-white/[0.03] p-4", collapsed ? "md:p-3" : null)}>
            <p className={cn("text-xs uppercase tracking-[0.18em] text-white/35", collapsed ? "md:hidden" : null)}>
              Focus mode
            </p>
            <p className={cn("mt-2 text-sm text-white/58", collapsed ? "md:hidden" : null)}>
              Keep the sidebar collapsed when you want a clean, distraction-free workspace.
            </p>
            <button
              className="mt-3 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/5"
              onClick={onToggleCollapse}
              type="button"
            >
              {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
