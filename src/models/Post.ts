export interface Post {
  postId: number;
  userId: number;
  created_date: string;
  updated_date?: string;
  content?: string;
  likes: string[]; // liked userIds
}
