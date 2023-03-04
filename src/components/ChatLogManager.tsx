import { Spin } from "antd";
import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { ChatLog } from "../models";
import { ChatMessager } from "./ChatMessager";

interface Props {
  socket: Socket;
}

export const ChatLogManager = ({ socket }: Props) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chatlogs, setChatLogs] = useState<ChatLog[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Define Event Handlers
  const handleConnect = () => {
    setIsConnected(true);
    socket.emit("join");
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    socket.removeAllListeners();
  };

  /**
   * Retrieve successfully left user from server
   * @param chatLog announcement ChatLog
   */
  const handleLeaveRoom = (chatLog: ChatLog) => {
    console.log("left", chatLog);
    setChatLogs((prev) => [...prev, chatLog]);
  };

  /**
   * Retrieve successfully joined user from server
   * @param chatlog announcement ChatLog
   */
  const handleJoinRoom = (chatLog: ChatLog) => {
    console.log("joined", chatLog);
    setChatLogs((prev) => [...prev, chatLog]);
  };

  /**
   * Retrieve successfully sent message from server
   * @param chatlog message ChatLog
   */
  const handleMessageSuccess = (chatlog: ChatLog) => {
    setChatLogs((prev) => [...prev, chatlog]);
  };

  // Scroll to bottom for new chat
  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [chatlogs]);

  //  Add Event Handlers
  useEffect(() => {
    setChatLogs([]);

    socket.on("connect", handleConnect);
    socket.on("reconnect", handleConnect);
    socket.on("join_success", handleJoinRoom);
    socket.on("join_fail", handleDisconnect);
    socket.on("leave_success", handleLeaveRoom);
    socket.on("message_success", handleMessageSuccess);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("reconnect", handleConnect);
      socket.off("join_success", handleJoinRoom);
      socket.off("join_fail", handleDisconnect);
      socket.off("leave_success", handleLeaveRoom);
      socket.off("message_success", handleMessageSuccess);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  return (
    <div className="vertical flex-space chatbox">
      <div className="flex-space chatbox">
        <Spin spinning={!isConnected}>
          {chatlogs.map((item, idx) => {
            const localTime = new Date(item.time).toLocaleTimeString();

            if (item.type === "announcement") {
              return (
                <div className="horizontal light" key={idx}>
                  {item.message} | {localTime}
                </div>
              );
            }
            return (
              <div className="horizontal" key={idx}>
                <span className="bold">{item.username}: </span>
                <span>{item.message}</span>
                <span className="light">| {localTime}</span>
              </div>
            );
          })}
          <div ref={ref} />
        </Spin>
      </div>
      <ChatMessager socket={socket} />
    </div>
  );
};
