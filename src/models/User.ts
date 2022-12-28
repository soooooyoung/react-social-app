export interface User {
  userId: number;
  username: string;
  pasword: string;
  status: "ACTIVE" | "INACTIVE";
  following: string[]; // user_Id []
  created_date: string;
  nickname?: string;
}
