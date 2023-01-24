import { UseQueryOptions } from "@tanstack/react-query";
import { Friend, Friendship } from "../models";
import { showErrorModal } from "../utils/responseUtils";
import {
  QueryKeyT,
  useDelete,
  useFetch,
  usePost,
  useUpdate,
} from "./reactQuery";

export const useFetchAllFriends = (
  userId?: number,
  config?: UseQueryOptions<Friend[], Error, Friend[], QueryKeyT>
) => {
  return useFetch<Friend[]>(
    `/friend/${userId}`,
    {},
    {
      ...config,
      retry: false,
      onError: (e) => {
        showErrorModal(e.message);
      },
    }
  );
};

export const useSaveFriendRequest = () => {
  return usePost<Friendship[], Friendship>("/friend");
};

export const useDeleteFriendRequest = () => {
  return useDelete<Friendship>("/friend");
};
export const useUpdateFriendRequest = () => {
  return useUpdate<Friendship[], Friendship>("/friend");
};
