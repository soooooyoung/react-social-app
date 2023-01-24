export interface User {
  userId?: number;
  username?: string;
  password?: string;

  typeCode?: "E" | "K" | "N" | "G";
  created_date?: string;
  nickname?: string;
  intro?: string;
  profileImgUrl?: string;
  // joined friendship table
  requesterId?: number;
  addresseeId?: number;
  statusCode?: "A" | "B" | "D" | "R";
}
