import { useAppSelector } from "../app/hooks";
import { Friendlist } from "../components/layout/FriendList";
import { Profile } from "../components/layout/Profile";
import { selectAuth } from "../app/redux/authSlice";
import { PostList } from "../components/layout/PostList";
import "../style/HomePage.scss";
import { useNavigate, useParams } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = useAppSelector(selectAuth).user?.userId;
  const currentId = Number(id) || userId;

  const handleClickFriend = (friendId: number) => {
    if (friendId) navigate(`/${friendId}`);
  };

  return (
    <div className="home-container">
      <div className="sider">
        <Profile userId={currentId} />
      </div>
      <PostList currentId={currentId} />
      <div className="sider">
        <Friendlist onClickFriend={handleClickFriend} />
      </div>
    </div>
  );
};
