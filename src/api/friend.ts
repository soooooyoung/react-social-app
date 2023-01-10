import { UseQueryOptions } from "@tanstack/react-query";
import { Friend, Friendship } from "../models";
import { showErrorModal } from "../utils/responseUtils";
import { QueryKeyT, useFetch, usePost } from "./reactQuery";

export const useFetchAllFriends = (
  userId?: number,
  config?: UseQueryOptions<Friend[], Error, Friend[], QueryKeyT>
) => {
  return useFetch<Friend[]>(
    `/friend/${userId}`,
    {},
    {
      ...config,
      onError: (e) => {
        showErrorModal(e.message);
      },
    }
  );
};

export const useSaveFriendRequest = () => {
  return usePost<Friendship[], Friendship>("/friend");
};

// export const useSavePost = (userId?: number) => {
//   return usePost<Post[], Post>(`/posts/${userId}`, {}, (array, newData) => [
//     ...array,
//     newData,
//   ]);
// };

// export const useDeletePost = (userId?: number) => {
//   return useDelete<Post[]>(`/posts/${userId}`, {}, (array, id) =>
//     array.filter((post) => post.postId !== id)
//   );
// };

// export const useUpdatePost = (userId?: number) =>
//   useUpdate<Post[], Post>(`/posts/${userId}`, {}, (array, newData) =>
//     array.map((post) => {
//       if (post.postId === newData.postId) {
//         return newData;
//       }
//       return post;
//     })
//   );
