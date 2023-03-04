import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/redux/authSlice";
import { ChatLogManager } from "../components/ChatLogManager";
import { ChatMessager } from "../components/ChatMessager";
import "../style/ChatRoomPage.scss";

export const ChatRoomPage = () => {
  const username = useAppSelector(selectAuth).user?.username;
  console.log("render");
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io("http://localhost:8080/room", {
      query: { username: username || "unknown", roomId: 1 },
    });
    newSocket.emit("join");
    setSocket(newSocket);
  }, []);

  return (
    <div>
      <div className="title bold">Chat Room</div>
      {socket && (
        <>
          <ChatLogManager socket={socket} />
          <ChatMessager socket={socket} />
        </>
      )}
    </div>
  );
};
