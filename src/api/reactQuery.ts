import {
  UseQueryOptions,
  useQuery,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import axios from "axios";
import { env } from "../config/env";

/*
 *
 * axios
 *
 */

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(`${env.server}${url}`, {
      ...params,
      headers: {
        Authorization: env.server,
      },
    }),
};

/*
 *
 * React Query
 *
 */
export type QueryKeyT = [string, object | undefined];

export const fetcher = async <T>({
  queryKey,
  pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey;
  return await api
    .get<T>(url, { params: { ...params, page: pageParam } })
    .then((res) => res.data);
};
/*
 *
 * fetch
 *
 */
export const useFetch = <T>(
  url: string,
  params?: object,
  config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
  return useQuery<T, Error, T, QueryKeyT>(
    [url, params],
    ({ queryKey }) => fetcher({ queryKey, meta: undefined }),

    {
      enabled: true,
      refetchOnWindowFocus: false,
      ...config,
    }
  );
};
/*
 *
 * infinite fetch
 *
 */
export const useInfiniteFetch = <T>(
  url: string,
  config?: Omit<
    UseInfiniteQueryOptions<T, Error, T, T, QueryKeyT>,
    "queryKey" | "queryFn"
  >
) => {
  return useInfiniteQuery<T, Error, T, QueryKeyT>(
    [url, {}],
    ({ queryKey, pageParam = 1 }) =>
      fetcher({ queryKey, meta: undefined, pageParam }),
    { ...config }
  );
};
