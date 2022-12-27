import { User } from "./User";

export interface Response {
  success: boolean;
  error?: Error;
}

export interface AuthResponse extends Response {
  result: {
    authToken?: string;
    user?: User;
  };
}
