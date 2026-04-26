import { Outlet } from "react-router-dom";
import { PublicNavbar } from "./PublicNavbar";

export function PublicLayout({ user = null }) {
  return (
    <div className="min-h-screen bg-black text-slate-100">
      <PublicNavbar user={user} />
      <Outlet />
    </div>
  );
}
