import { useMutation, useQuery } from "@tanstack/react-query";
import axios, {
  type Method,
  type AxiosHeaders,
  type RawAxiosRequestHeaders,
} from "axios";
import Cookie from "js-cookie";

type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;

export const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_END_POINT,
  headers: {
    Accepts: "application/json",
    "Content-Type": "application/json",
  },
});

// Axios response interceptor to handle 401 errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 unauthorized
      Cookie.remove("_token");
      // Only redirect if not already on login page to avoid loops
      if (!window.location.pathname.includes("/login")) {
        const returnUrl = encodeURIComponent(
          window.location.pathname + window.location.search
        );
        // Redirect to admin login if on admin route, otherwise customer login
        const isAdminRoute = window.location.pathname.startsWith("/admin");
        const loginPath = isAdminRoute ? "/admin/login" : "/login";
        window.location.href = `${loginPath}?returnUrl=${returnUrl}`;
      }
    }
    return Promise.reject(error);
  }
);

export const useGet = <T>({
  url,
  key,
  params,
  transform,
  headers,
  enabled,
}: {
  url: string;
  key: string[];
  params: any;
  transform?: (data: any) => any;
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
  enabled?: boolean;
}) => {
  const token = Cookie.get("_token");
  return useQuery<T>({
    queryKey: key,
    queryFn: async (): Promise<T> => {
      const response = await instance.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        params,
      });
      return typeof transform === "function"
        ? transform(response)
        : response.data;
    },
    enabled,
  });
};

export const useMutate = <T>({
  method = "post",
  url,
  headers,
  params,
  success,
  error,
  requireAuth = true,
}: {
  method: "post" | "put" | "delete" | "patch";
  url: string;
  headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders;
  params?: string;
  success?: (data: any) => Promise<unknown> | unknown;
  error?: (error: any) => Promise<unknown> | unknown;
  requireAuth?: boolean;
}) => {
  const token = Cookie.get("_token");
  return useMutation({
    mutationFn: (payload: T) => {
      const option = {
        headers: {
          ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        params,
      };
      if (method === "put") return instance.put(`${url}`, payload, option);
      if (method === "patch") return instance.patch(`${url}`, payload, option);
      if (method === "delete")
        return instance.delete(`${url}/${payload}`, option);
      return instance.post(`${url}`, payload, option);
    },
    onError: error,
    onSuccess: success,
  });
};
