import { TeamOutlined } from "@ant-design/icons";
import { Spin, Tooltip } from "antd";
import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { ChatLog } from "../models";
import { ChatMessager } from "./ChatMessager";

interface Props {
  socket: Socket;
  showMembers?: boolean;
  onConnect?: () => void;
  onDisConnect?: () => void;
  addressee?: string;
}

export const ChatLogManager = ({
  socket,
  onConnect,
  onDisConnect,
  showMembers,
  addressee,
}: Props) => {
  const [chatlogs, setChatLogs] = useState<ChatLog[]>([]);
  const [particpants, setParticpants] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Define Event Handlers
  const handleConnect = () => {
    if (onConnect) onConnect();
    socket.emit("join");
  };

  const handleDisconnect = () => {
    if (onDisConnect) onDisConnect();
  };

  /**
   * Retrieve successfully left user from server
   * @param chatLog announcement ChatLog
   */
  const handleLeaveRoom = (chatLog: ChatLog) => {
    setChatLogs((prev) => [...prev, chatLog]);
  };

  /**
   * Retrieve successfully joined user from server
   * @param chatlog announcement ChatLog
   */
  const handleJoinRoom = (chatLog: ChatLog) => {
    setChatLogs((prev) => [...prev, chatLog]);
  };

  /**
   * Retrieve successfully sent message from server
   * @param chatlog message ChatLog
   */
  const handleMessageSuccess = (chatlog: ChatLog) => {
    setChatLogs((prev) => [...prev, chatlog]);
  };
  /**
   * Retrieve participants in room
   * @param chatlog message ChatLog
   */
  const handleParicipants = (users: string[]) => {
    setParticpants(users);
  };

  // Scroll to bottom for new chat
  useEffect(() => {
    ref.current?.scrollIntoView();
  }, [chatlogs]);

  //  Add Event Handlers
  useEffect(() => {
    setChatLogs([]);

    socket.on("connect", handleConnect);
    socket.on("join_success", handleJoinRoom);
    socket.on("join_fail", handleDisconnect);
    socket.on("leave_success", handleLeaveRoom);
    socket.on("message_success", handleMessageSuccess);
    socket.on("participants", handleParicipants);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("join_success", handleJoinRoom);
      socket.off("join_fail", handleDisconnect);
      socket.off("leave_success", handleLeaveRoom);
      socket.off("message_success", handleMessageSuccess);
      socket.off("participants", handleParicipants);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  return (
    <div className="vertical flex-space chatbox">
      <div className="flex-space chatbox vertical">
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
              <span className="flex-space">{item.message}</span>
              <span className="light"> {localTime}</span>
            </div>
          );
        })}
        <div ref={ref} />
      </div>
      <div className="horizontal">
        <ChatMessager socket={socket} addressee={addressee} />
        {showMembers && (
          <Tooltip
            showArrow={false}
            color="#ffb3c1"
            title={
              <div className="vertical">
                {particpants.map((item, idx) => (
                  <span key={idx}>{item}</span>
                ))}
              </div>
            }
          >
            <TeamOutlined className="ui-icon" />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
