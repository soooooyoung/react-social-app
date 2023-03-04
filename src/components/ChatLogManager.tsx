import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ChatLog } from "../models";

interface Props {
  socket: Socket;
}

export const ChatLogManager = ({ socket }: Props) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chatlogs, setChatLogs] = useState<ChatLog[]>([]);

  // Define Event Handlers
  const handleConnect = () => {
    setIsConnected(true);
  };
  const handleDisconnect = () => {
    setIsConnected(false);
    socket.removeAllListeners();
  };

  const handleJoinRoom = (roomId: number) => {
    console.log("joined room: ", roomId);
  };

  /**
   * Retrieve saved message from server
   * @param chatlog saved ChatLog
   */
  const handleSaveMessage = (chatlog: ChatLog) => {
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
    socket?.on("message_success", handleSaveMessage);

    return () => {
      socket?.off("connect", handleConnect);
      socket?.off("reconnect", handleConnect);
      socket?.off("disconnect", handleDisconnect);
      socket?.off("join_success", handleJoinRoom);
      socket?.off("join_fail", handleDisconnect);
      socket?.off("message_success", handleSaveMessage);
    };
  });
  return (
    <Spin spinning={!isConnected}>
      {chatlogs.map((item) => (
        <div className="item">{item.message}</div>
      ))}
    </Spin>
  );
};
