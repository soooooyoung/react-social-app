export interface Post {
  postId?: number;
  userId?: number;
  created_date?: string; // added by mysql
  updated_date?: string;
  content?: string;
  // likes: string[]; // liked userIds
}
