import { QueryKeyT, useFetch, usePost } from "./reactQuery";
import { Response, User } from "../models";
import { UseQueryOptions } from "@tanstack/react-query";

export const useCheckIsSafe = () => {
  return usePost<User, Response>("/signup/check");
};

export const useSendSignupEmail = () => {
  return usePost<User, Response>("/mail/signup");
};

export const useVerifyEmail = (
  token?: string,
  config?: UseQueryOptions<Response, Error, Response, QueryKeyT>
) => {
  return useFetch<Response>("/signup/verify", { token }, config);
};
