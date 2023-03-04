import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/redux/authSlice";
import { ChatLogManager } from "../components/ChatLogManager";
import { env } from "../config/env";

export const ChatRoomPage = () => {
  const username = useAppSelector(selectAuth).user?.username;
  const [socket, setSocket] = useState<Socket>();
  let { roomId } = useParams();

  useEffect(() => {
    const newSocket = io(`${env.socket}/room`, {
      withCredentials: true,
      query: { username: username || "unknown", roomId },
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave");
      newSocket.close();
    };
  }, [roomId, username]);

  return (
    <div className="page vertical">
      <div className="title bold">Chat Room #{roomId}</div>
      {socket && <ChatLogManager socket={socket} />}
    </div>
  );
};
