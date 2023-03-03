import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/redux/authSlice";
import "../style/ChatRoomPage.scss";

interface ChatLog {
  time: string;
  message: string;
  username: string;
}

export const ChatRoomPage = () => {
  const user = useAppSelector(selectAuth).user;
  const [socket, setSocket] = useState<Socket>(
    io("http://localhost:8080/room", {
      query: { name: user?.username || "unknown", roomId: 0 },
    })
  );
  const [chatlogs, setChatLogs] = useState<ChatLog[]>([]);

  // Event Handlers
  useEffect(() => {
    socket.emit("join");

    socket.on("connect", () => {
      console.log("PING");
    });

    socket.on("join_success", () => {
      console.log("join_success");
    });

    socket.on("message_saved", (message) => {
      console.log("message_saved", message);
    });

    return () => {
      socket.off("connect");
      socket.off("join_success");
      socket.off("message_saved");
    };
  }, [socket]);

  const onClickButton = () => {
    socket.emit("save", "test meesage");
  };

  return (
    <div>
      <div className="title bold">Chat Room</div>

      <div className="item">ff</div>
      <button onClick={onClickButton}>test</button>
      <TextArea />
    </div>
  );
};
