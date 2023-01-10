export interface Friendship {
  requesterId: number;
  addresseeId: number;
  statusCode?: "A" | "B" | "D" | "R";
}

export interface Friend {
  nickname?: string;
  profileImgUrl?: string;
  intro?: string;
  userId: number;
  username: string;
}
