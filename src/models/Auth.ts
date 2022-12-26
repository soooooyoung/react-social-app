import { User } from "./User";

export interface Auth {
  authToken?: string;
  user?: User;
  isAuthenticated: boolean;
}
