export interface Comment {
  commentId: number;
  userId: number;
  postId: number;
  created_date: string;
  content?: string;
}
