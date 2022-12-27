import { usePost } from "./reactQuery";
import { LoginParams, AuthTokenParams, AuthResponse } from "../models";

/**
 * Fetch
 */

export const useLogin = () => {
  return usePost<AuthResponse, LoginParams>("/login");
};

export const useCheckAuth = () => {
  return usePost<AuthResponse, AuthTokenParams>("/authToken");
};
