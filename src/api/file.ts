import { useDelete, usePostFile } from "./reactQuery";
import { Response } from "../models";

export const useSaveImageProfile = (userId?: number) => {
  return usePostFile<any, Response>(`/file/user/${userId}`);
};

export const useDeleteImageProfile = (userId?: number) => {
  return useDelete<any>(`/file/user/${userId}`);
};
