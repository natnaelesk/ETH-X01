import { Outlet } from "react-router-dom";
import { PublicNavbar } from "./PublicNavbar";

export function PublicLayout({ user = null }) {
  return (
    <div className="neo-scope min-h-screen">
      <PublicNavbar user={user} />
      <Outlet />
    </div>
  );
}
