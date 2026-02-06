import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type UseGetParams = {
  url: string;
  params: Record<string, unknown>;
  key: string;
};

export const useGet = ({ url, params, key }: UseGetParams) => {
  return useQuery({
    queryKey: [key],
    queryFn: () =>
      api.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  });
};
