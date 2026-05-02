import { Outlet, useLocation } from "react-router-dom";
import { PublicNavbar } from "./PublicNavbar";

export function PublicLayout({ user = null }) {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="neo-scope min-h-screen">
      {!hideNavbar && <PublicNavbar user={user} />}
      <Outlet />
    </div>
  );
}
