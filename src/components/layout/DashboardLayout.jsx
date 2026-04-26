import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

const titleMap = [
  { test: (pathname) => pathname === '/dashboard', title: 'Dashboard' },
  { test: (pathname) => pathname.startsWith('/dashboard/dsa'), title: 'DSA Topics' },
  { test: (pathname) => pathname.startsWith('/dashboard/challenges'), title: 'Daily Challenges' },
  { test: (pathname) => pathname.startsWith('/dashboard/python'), title: 'Python Track' },
  { test: (pathname) => pathname.startsWith('/dashboard/leaderboard'), title: 'Leaderboard' },
  { test: (pathname) => pathname.startsWith('/dashboard/profile'), title: 'Profile' },
]

export function DashboardLayout() {
  const guestUser = {
    name: "Preview Mode",
    email: "Dashboard access is currently open",
    photoURL: "",
  };
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem("dashboard.sidebar.collapsed") === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.localStorage.setItem("dashboard.sidebar.collapsed", String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const title = useMemo(() => {
    const matched = titleMap.find((item) => item.test(location.pathname));
    return matched?.title || "Dashboard";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_24%)]" />
      <div className="relative flex min-h-screen">
        <DashboardSidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          onToggleCollapse={() => setCollapsed((value) => !value)}
        />

        <div className={cn("flex min-w-0 flex-1 flex-col")}>
          <DashboardTopbar
            onLogout={null}
            onOpenSidebar={() => setMobileOpen(true)}
            onToggleCollapse={() => setCollapsed((value) => !value)}
            title={title}
            user={guestUser}
          />

          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
