import {
  UseQueryOptions,
  useQuery,
  QueryFunctionContext,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
// import Cookies from "js-cookie";
import { env } from "../config/env";

/*
 *
 * axios
 *
 */

axios.defaults.withCredentials = true;

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(`${env.server}${url}`, {
      ...params,
      headers: {
        apikey: env.apikey,
      },
    }),
  post: <T>(url: string, data: any) =>
    axios.post<T>(`${env.server}${url}`, data, {
      headers: {
        apikey: env.apikey,
      },
    }),
  patch: <T>(url: string, data: any) =>
    axios.patch<T>(`${env.server}${url}`, data, {
      headers: {
        apikey: env.apikey,
      },
    }),
  delete: <T>(url: string) =>
    axios.delete<T>(`${env.server}${url}`, {
      headers: {
        apikey: env.apikey,
      },
    }),
  postFile: <T>(url: string, file: any) =>
    axios.post<T>(`${env.server}${url}`, file, {
      headers: {
        apikey: env.apikey,
        "Content-Type": "multipart/form-data",
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

const useGenericMutation = <T, S>(
  func: (data: T | S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]);

      queryClient.setQueryData<T>([url!, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url!, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url!, params]);
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`),
    url,
    params,
    updater
  );
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url, data),
    url,
    params,
    updater
  );
};

export const usePostFile = <T, S>(url: string, file?: any) => {
  return useGenericMutation<T, S>(
    (data) => api.postFile<S>(url, data),
    url,
    file
  );
};

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T
) => {
  return useGenericMutation<T, S>(
    (data) => api.patch<S>(url, data),
    url,
    params,
    updater
  );
};
