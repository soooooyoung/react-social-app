import { Link } from "react-router-dom";

interface Props {
  onClick?: () => void;
}

export const ChatListPage = ({ onClick }: Props) => {
  const handleOnClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className="box">
      <div className="vertical menu">
        <Link className="menu-item" to="/chatroom/1" onClick={handleOnClick}>
          <span>Chat ROOM #1</span>
        </Link>
        <Link className="menu-item" to="/chatroom/2" onClick={handleOnClick}>
          <span>Chat ROOM #2</span>
        </Link>
      </div>
    </div>
  );
};
