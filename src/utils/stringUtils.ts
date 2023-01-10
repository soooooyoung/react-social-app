import { User } from "../models";

export const getUsername = (user?: User) => {
  if (!user || user.statusCode === "I") {
    return "Unknown";
  }
  if (user.nickname) {
    return `${user.nickname} (${user.username})`;
  }
  return user.username;
};
