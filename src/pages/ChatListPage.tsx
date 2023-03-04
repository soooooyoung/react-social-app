import { Link } from "react-router-dom";

interface Props {
  onClick?: () => void;
}

export const ChatListPage = ({ onClick }: Props) => {
  const handleOnClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className="page box">
      <div className="vertical">
        <Link to="/chatroom/1" onClick={handleOnClick}>
          <span>Chat ROOM #1</span>
        </Link>
        <Link to="/chatroom/2" onClick={handleOnClick}>
          <span>Chat ROOM #2</span>
        </Link>
      </div>
    </div>
  );
};
