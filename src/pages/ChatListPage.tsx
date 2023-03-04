import { Link } from "react-router-dom";

export const ChatListPage = () => {
  return (
    <div>
      <div className="title bold">Chat List</div>
      <Link to="/chatroom/1">
        <span>Chat ROOM 0</span>
      </Link>
    </div>
  );
};
