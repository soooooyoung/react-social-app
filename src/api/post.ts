import { UseQueryOptions } from "@tanstack/react-query";
import { Post } from "../models";
import { showErrorModal } from "../utils/responseUtils";
import { QueryKeyT, useFetch } from "./reactQuery";

/**
 * Fetch
 */
export const useFetchAllPosts = (
  userId?: number,
  config?: UseQueryOptions<Post[], Error, Post[], QueryKeyT>
) => {
  return useFetch<Post[]>(
    `/posts/${userId}`,
    {},
    {
      ...config,
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: (data) => {
        //TODO: sort by updated date
        return data.reverse();
      },
    }
  );
};
