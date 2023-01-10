import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { User } from "../../models";
import { getUsername } from "../../utils/stringUtils";
import { AppFooter } from "../layout/AppFooter";
import "./Profile.scss";

interface Props {
  user?: User;
  size?: number;
}

export const Profile = ({ user, size }: Props) => {
  return (
    <div className="profile">
      <div className="content">
        {/* <span className="title">Profile</span> */}
        <div className="profile-img-container">
          <Avatar size={size || 240} icon={<UserOutlined />} />
        </div>
        <span>{getUsername(user)}</span>
        <span>{user?.intro}</span>
      </div>
      <AppFooter className="footer" />
    </div>
  );
};
