import { UseQueryOptions } from "@tanstack/react-query";
import { Comment } from "../models";
import { showErrorModal } from "../utils/responseUtils";
import { QueryKeyT, useDelete, useFetch, usePost } from "./reactQuery";

export const useFetchAllComments = (
  postId?: number,
  config?: UseQueryOptions<Comment[], Error, Comment[], QueryKeyT>
) => {
  return useFetch<Comment[]>(
    `/comment/${postId}`,
    {},
    {
      ...config,
      onError: (e) => {
        showErrorModal(e.message);
      },
    }
  );
};
export const useSaveComment = (postId?: number) => {
  return usePost<Comment[], Comment>(
    `/comment/${postId}`,
    {},
    (array, newData) => [...array, newData]
  );
};

export const useDeleteComment = (postId?: number) => {
  return useDelete<Comment[]>(`/comment/${postId}`, {}, (array, id) =>
    array.filter((comment) => comment.postId !== id)
  );
};
