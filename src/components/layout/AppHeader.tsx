import {
  AppstoreFilled,
  ExportOutlined,
  MenuOutlined,
  MessageFilled,
  SettingOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { reset, selectAuth } from "../../app/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { env } from "../../config/env";
import { SearchInput } from "../SearchInput";
import { Menu } from "./Menu";

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
      <img src={"/logo192.png"} alt="S" />
      {/* <span className="logo-symbol noselect">S</span> */}
      <SearchInput />
      <div className="flex-space" /> <MessageFilled />
      <Link to="/">
        <Avatar
          icon={<></>}
          src={user?.profileImgUrl && `${env.server}${user?.profileImgUrl}`}
        />
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
        // options={[
        //   <div className="logoutBtn" onClick={handleLogout}>
        //     Log Out
        //   </div>,
        // ]}
      />
    </div>
  );
};
