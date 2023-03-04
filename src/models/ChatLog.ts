export interface ChatLog {
  time: string;
  message: string;
  username: string;
  type: "message" | "announcement";
}
