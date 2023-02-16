import { Like } from "../models";
import { useDelete, usePost } from "./reactQuery";

export const useSaveLike = (userId?: number) => {
  return usePost<Like, Like>(`/like/${userId}`);
};

export const useDeleteLike = (userId?: number) => {
  return useDelete<Like>(`/like/${userId}`);
};
