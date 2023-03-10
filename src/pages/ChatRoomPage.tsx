import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAppSelector } from "../app/hooks";
import { selectAuth } from "../app/redux/authSlice";
import { ChatLogManager } from "../components/ChatLogManager";
import { env } from "../config/env";

export const ChatRoomPage = () => {
  const username = useAppSelector(selectAuth).user?.username;
  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();
  const { roomId } = useParams();

  useEffect(() => {
    const newSocket = io(`${env.socket}/room`, {
      path: "/ws/",
      query: { username, roomId },
      withCredentials: true,
      multiplex: false,
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave");
      newSocket.disconnect();
    };
  }, [roomId, username]);

  return (
    <Spin
      // size="large"
      spinning={!connected}
      tip="Connecting..."
    >
      <div className="page vertical">
        <div className="title bold">Chat Room #{roomId}</div>
        {socket && (
          <ChatLogManager
            socket={socket}
            onConnect={() => setConnected(true)}
            onDisConnect={() => setConnected(false)}
          />
        )}
      </div>
    </Spin>
  );
};
