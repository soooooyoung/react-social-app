import { env } from "../config/env";
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

export const getFileUrl = (url?: string) => {
  if (!url) {
    return "";
  }
  return `${env.server}${url}`;
};
