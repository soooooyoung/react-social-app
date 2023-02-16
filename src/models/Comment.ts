export interface Comment {
  commentId?: number;
  userId?: number;
  postId?: number;
  created_date?: string;
  content?: string;
  // merged from User
  profileImgUrl?: string;
  nickname?: string;
  username?: string;
}
