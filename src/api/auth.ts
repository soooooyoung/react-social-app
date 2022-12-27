import { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { LoginParams, Response } from "../models";
import { showErrorModal } from "../utils/responseUtils";

import { QueryKeyT, usePost, useFetch } from "./reactQuery";

/**
 * Fetch
 */

export const useLogin = () => {
  return usePost<LoginParams, Response>("/login");
};

export const useCheckAuthentication = (
  authToken?: string,
  config?: UseQueryOptions<boolean, Error, boolean, QueryKeyT>
): UseQueryResult<boolean, Error> => {
  return useFetch<boolean>(
    "/authToken",
    { authToken },
    {
      ...config,
      onSuccess: (data) => {
        return data;
      },
      onError: (e) => {
        showErrorModal(e);
      },
    }
  );
};
