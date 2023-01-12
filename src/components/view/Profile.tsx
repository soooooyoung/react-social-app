import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import { ChangeEvent, useState } from "react";
import { useFetchUser, useUpdateUser } from "../../api/user";
import { User } from "../../models";
import { getUsername } from "../../utils/stringUtils";
import { AppFooter } from "../layout/AppFooter";
import "./Profile.scss";

interface Props {
  userId?: number;
  size?: number;
}

export const Profile = ({ userId, size }: Props) => {
  const { data } = useFetchUser(userId, {
    enabled: !!userId,
  });
  const { mutateAsync } = useUpdateUser(userId);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>();

  const toggleEditMode = async () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditValue(data?.intro);
    } else {
      await mutateAsync({
        ...data,
        intro: editValue,
      });
    }
  };

  const handleClickEditButton = () => {
    toggleEditMode();
  };

  const handleChangeEditValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditValue(e.target.value);
  };

  return (
    <div className="profile">
      <div className="content">
        {/* <span className="title">Profile</span> */}
        <EditOutlined className="editBtn" onClick={handleClickEditButton} />
        <div className="profile-img-container">
          <Avatar size={size || 240} icon={<UserOutlined />} />
        </div>
        <span className="username">{getUsername(data)}</span>
        {editMode ? (
          <Input.TextArea onChange={handleChangeEditValue} value={editValue} />
        ) : (
          <span>{data?.intro}</span>
        )}
      </div>
      <AppFooter className="footer" />
    </div>
  );
};
