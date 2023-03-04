import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/redux/authSlice";
import { ChatLogManager } from "../components/ChatLogManager";
import "../style/ChatRoomPage.scss";

export const ChatRoomPage = () => {
  const username = useAppSelector(selectAuth).user?.username;
  const [socket, setSocket] = useState<Socket>();
  let { roomId } = useParams();

  useEffect(() => {
    // check room exists

    // connect to socket
    const newSocket = io("http://localhost:8080/room", {
      query: { username: username || "unknown", roomId },
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <div>
      <div className="title bold">Chat Room</div>
      {socket && <ChatLogManager socket={socket} />}
    </div>
  );
};
