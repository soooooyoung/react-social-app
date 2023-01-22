export interface LoginParams {
  username: string;
  password: string;
}
export interface UserQueryParams {
  userId?: number;
  username?: string;
  nickname?: string;
  email?: string;
  statusCode?: string;
  typeCode?: string;
}

export interface AuthTokenParams {
  authToken: string;
}
