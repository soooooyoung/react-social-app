import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { QueryKeyT, useFetch } from "./reactQuery";

/**
 * Fetch
 */
export const useCheckAuthentication = (
  authToken?: string,
  config?: UseQueryOptions<boolean, Error, boolean, QueryKeyT>
): UseQueryResult<boolean, Error> => {
  return useFetch<boolean>(
    "/auth",
    { authToken },
    {
      ...config,
      onSuccess: (data) => {
        return data;
      },
    }
  );
};
