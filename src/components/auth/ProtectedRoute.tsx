import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/useAuth";
import Cookie from "js-cookie";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireStaff?: boolean;
};

export default function ProtectedRoute({
  children,
  requireStaff = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isStaff, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const token = Cookie.get("_token");

  useEffect(() => {
    if (!token) {
      const returnUrl = encodeURIComponent(location.pathname + location.search);
      const loginPath = requireStaff ? "/admin/login" : "/login";
      navigate(`${loginPath}?returnUrl=${returnUrl}`, { replace: true });
      return;
    }

    if (!isLoading && token) {
      if (!isAuthenticated) {
        Cookie.remove("_token");
        const returnUrl = encodeURIComponent(
          location.pathname + location.search,
        );
        const loginPath = requireStaff ? "/admin/login" : "/login";
        navigate(`${loginPath}?returnUrl=${returnUrl}`, { replace: true });
        return;
      }

      if (requireStaff && !isStaff) {
        navigate("/", { replace: true });
        return;
      }
    }
  }, [
    isAuthenticated,
    isStaff,
    isLoading,
    token,
    navigate,
    location,
    requireStaff,
  ]);

  if (!token || isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (requireStaff && !isStaff) {
    return null;
  }

  return <>{children}</>;
}
