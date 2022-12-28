import { usePost } from "./reactQuery";
import { LoginParams, AuthResponse } from "../models";

/**
 * Fetch
 */

export const useLogin = () => {
  return usePost<AuthResponse, LoginParams>("/login");
};

export const useCheckAuth = () => {
  return usePost<AuthResponse, null>("/authToken");
};
