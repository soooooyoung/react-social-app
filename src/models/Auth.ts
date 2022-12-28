import { User } from "./User";

export interface Auth {
  user?: User;
  isAuthenticated: boolean;
}
