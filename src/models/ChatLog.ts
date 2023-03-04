export interface ChatLog {
  time: Date;
  message: string;
  username: string;
  type: "message" | "announcement";
}
