import { UseQueryOptions } from "@tanstack/react-query";
import { User, UserQueryParams } from "../models";
import { QueryKeyT, useUpdate, useFetch } from "./reactQuery";

export const useFetchUser = (
  userId?: number,
  config?: UseQueryOptions<User, Error, User, QueryKeyT>
) => {
  return useFetch<User>(`/user/${userId}`, {}, config);
};

export const useFetchUsers = (
  params?: UserQueryParams,
  config?: UseQueryOptions<User[], Error, User[], QueryKeyT>
) => {
  return useFetch<User[]>(`/user`, params, { ...config, retry: false });
};

export const useUpdateUser = (userId?: number) =>
  useUpdate<User, User>(`/user/${userId}`, {}, (oldData, newData) => newData);
