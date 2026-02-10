import { useGet } from "./query";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

export type AuthUser = {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  type: "staff" | "customer";
  role?: string;
  employeeUuid?: string;
  permissions?: {
    products: boolean;
    inventory: boolean;
    orders: boolean;
    pos: boolean;
    settings: boolean;
    reports: boolean;
  };
  phone?: string | null;
};

export const useAuth = () => {
  const navigate = useNavigate();
  const token = Cookie.get("_token");

  const { data, isLoading, error, refetch } = useGet<AuthUser>({
    url: "/api/auth/me",
    key: ["auth", "me"],
    params: {},
    enabled: !!token,
    transform: (response: any) => {
      const userData = response?.data?.data || response?.data;
      return userData as AuthUser;
    },
  });

  const user = data as AuthUser | undefined;
  const isAuthenticated = !!user && !!token;
  const isStaff = user?.type === "staff";
  const isCustomer = user?.type === "customer";

  const logout = () => {
    const userType = user?.type;
    Cookie.remove("_token");

    if (userType === "staff") {
      navigate("/admin/login");
    } else {
      navigate("/login");
    }
  };

  return {
    user,
    isAuthenticated,
    isStaff,
    isCustomer,
    isLoading,
    error,
    refetch,
    logout,
  };
};
