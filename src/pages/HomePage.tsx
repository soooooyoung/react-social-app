import { useAppSelector } from "../app/hooks";
import { Friendlist } from "../components/layout/FriendList";
import { Profile } from "../components/layout/Profile";
import { selectAuth } from "../app/redux/authSlice";
import { PostList } from "../components/layout/PostList";
import "../style/HomePage.scss";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useState, useEffect } from "react";
import { env } from "../config/env";

export const HomePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [socket, setSocket] = useState<Socket>();
  const user = useAppSelector(selectAuth).user;
  const currentId = Number(id) || user?.userId;

  const handleClickFriend = (friendId: number) => {
    if (friendId) navigate(`/${friendId}`);
  };

  useEffect(() => {
    const newSocket = io(`${env.socket}/private`, {
      path: "/ws/",
      query: { username: user?.username },
      withCredentials: true,
      multiplex: false,
    });

    setSocket(newSocket);

    return () => {
      newSocket.emit("leave");
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <div className="home-container">
      <div className="sider">
        <Profile userId={currentId} />
      </div>
      <PostList currentId={currentId} />
      <div className="sider">
        {socket && (
          <Friendlist onClickFriend={handleClickFriend} socket={socket} />
        )}
      </div>
    </div>
  );
};
