import { useAppSelector } from "../app/hooks";
import { Friendlist } from "../components/layout/FriendList";
import { Profile } from "../components/layout/Profile";
import { selectAuth } from "../app/redux/authSlice";
import { PostList } from "../components/layout/PostList";
import "../style/HomePage.scss";

export const HomePage = () => {
  const { user } = useAppSelector(selectAuth);

  return (
    <div className="home-container">
      <div className="sider">
        <Profile userId={user?.userId} />
      </div>
      <PostList userId={user?.userId} />
      <div className="sider">
        <Friendlist />
      </div>
    </div>
  );
};
