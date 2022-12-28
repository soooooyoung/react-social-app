import { UseQueryOptions } from "@tanstack/react-query";
import { Post } from "../models";
import { showErrorModal } from "../utils/responseUtils";
import {
  QueryKeyT,
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "./reactQuery";

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
    }
  );
};

export const useSavePost = (userId?: number) => {
  return usePost<Post[], Post>(`/posts/${userId}`, {}, (array, newData) => [
    ...array,
    newData,
  ]);
};

export const useDeletePost = (userId?: number) => {
  return useDelete<Post[]>(`/posts/${userId}`, {}, (array, id) =>
    array.filter((post) => post.postId !== id)
  );
};

export const useUpdatePost = (userId?: number) =>
  useUpdate<Post[], Post>(`/posts/${userId}`, {}, (array, newData) =>
    array.map((post) => {
      if (post.postId === newData.postId) {
        return newData;
      }
      return post;
    })
  );
