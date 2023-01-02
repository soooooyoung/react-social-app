import { UseQueryOptions } from "@tanstack/react-query";
import { EmailStatusResponse } from "../models/Response";
import { showErrorModal } from "../utils/responseUtils";
import { QueryKeyT, useFetch } from "./reactQuery";

export const useCheckEmailStatus = (
  userId?: number,
  config?: UseQueryOptions<
    EmailStatusResponse,
    Error,
    EmailStatusResponse,
    QueryKeyT
  >
) => {
  return useFetch<EmailStatusResponse>(
    `/posts/${userId}`,
    {},
    {
      ...config,
      onError: (e) => {
        showErrorModal(e.message);
      },
    }
  );
};
