import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ChatLog } from "../models";
import { ChatMessager } from "./ChatMessager";

interface Props {
  socket: Socket;
}

export const ChatLogManager = ({ socket }: Props) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chatlogs, setChatLogs] = useState<ChatLog[]>([]);

  // Define Event Handlers
  const handleConnect = () => {
    setIsConnected(true);
    socket.emit("join");
  };
  const handleDisconnect = () => {
    setIsConnected(false);
    socket.removeAllListeners();
  };

  const handleJoinRoom = (roomId: number) => {
    console.log("joined room: ", roomId);
  };

  /**
   * Retrieve successfully sent message from server
   * @param chatlog saved ChatLog
   */
  const handleMessageSuccess = (chatlog: ChatLog) => {
    console.log("saved", chatlog);
    setChatLogs((prev) => [...prev, chatlog]);
  };

  // https://socket.io/how-to/use-with-react-hooks
  //  Add Event Handlers
  useEffect(() => {
    socket?.on("connect", handleConnect);
    socket?.on("reconnect", handleConnect);
    socket?.on("disconnect", handleDisconnect);
    socket?.on("join_success", handleJoinRoom);
    socket?.on("join_fail", handleDisconnect);
    socket?.on("message_success", handleMessageSuccess);

    return () => {
      socket?.off("connect", handleConnect);
      socket?.off("reconnect", handleConnect);
      socket?.off("join_success", handleJoinRoom);
      socket?.off("join_fail", handleDisconnect);
      socket?.off("message_success", handleMessageSuccess);
      socket?.off("disconnect", handleDisconnect);
    };
  });
  return (
    <Spin spinning={!isConnected}>
      {chatlogs.map((item, idx) => (
        <div className="item" key={idx}>
          {item.message}
        </div>
      ))}
      <ChatMessager socket={socket} />
    </Spin>
  );
};
