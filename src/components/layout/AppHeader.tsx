import {
  ExportOutlined,
  MenuOutlined,
  MessageFilled,
  SettingOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Avatar, Badge } from "antd";
import { Link } from "react-router-dom";
import { reset, selectAuth } from "../../app/redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { env } from "../../config/env";
import { SearchInput } from "../SearchInput";
import { Menu } from "./Menu";
import { getFileUrl } from "../../utils/stringUtils";

export const AppHeader = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectAuth).user;
  const handleLogout = () => {
    // TODO: remove cookie server request
    dispatch(reset());
  };

  return (
    <div {...props}>
      <Link to="/">
        <img src={"/logo192.png"} alt="S" />
      </Link>
      <SearchInput />
      <div className="flex-space" />
      <Link to="/chatroom">
        <MessageFilled />
      </Link>
      <Link to="/">
        <Badge count={1}>
          <Avatar icon={<></>} src={getFileUrl(user?.profileImgUrl)} />
        </Badge>
      </Link>
      <Menu
        icon={<MenuOutlined className="menuBtn" />}
        items={[
          {
            label: (
              <div className="menu-item">
                <ShopOutlined /> <span className="menu-title">Shop</span>
              </div>
            ),
            key: "2",
          },
          {
            label: (
              <div className="menu-item">
                <SettingOutlined /> <span className="menu-title">Settings</span>
              </div>
            ),
            key: "3",
          },
          {
            label: (
              <div className="menu-item" onClick={handleLogout}>
                <ExportOutlined /> <span className="menu-title">Log Out</span>
              </div>
            ),
            key: "1",
          },
        ]}
      />
    </div>
  );
};
