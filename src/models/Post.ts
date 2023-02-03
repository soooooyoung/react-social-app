export type PostStatus = "B" | "F" | "G" | "P"; // BLOCKED | FRIENDS ONLY | GLOBAL | PRIVATE
// DEFAULT: G
export interface Post {
  postId?: number;
  userId?: number;
  created_date?: string; // added by mysql
  updated_date?: string;
  content?: string;
  statusCode?: PostStatus;
}
