import { QueryKeyT, useFetch, usePost } from "./reactQuery";
import { Response, User } from "../models";

export const useCreateFile = (userId: string) => {
  return usePost<string, Response>(`/file/user/${userId}`);
};
