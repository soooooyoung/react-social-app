import { CameraOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import React from "react";
import { ChangeEvent, useState } from "react";
import { useFetchUser, useUpdateUser } from "../../api/user";
import { getUsername } from "../../utils/stringUtils";
import { FileUploader } from "../FileUploader";
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

  const handleClickCameraButton = () => {};

  return (
    <div className="profile">
      <div className="content">
        <div className="content-ui">
          <EditOutlined className="editBtn" onClick={handleClickEditButton} />
          <FileUploader icon={<CameraOutlined />} />
          {/* <CameraOutlined onClick={handleClickCameraButton} /> */}
        </div>
        <div className="profile-img-container">
          <Avatar size={size || 240} icon={<UserOutlined />} />
        </div>

        <span className="username">{getUsername(data)}</span>
        {editMode ? (
          <Input.TextArea
            className="text-area"
            onChange={handleChangeEditValue}
            maxLength={500}
            value={editValue}
          />
        ) : (
          <span>
            {data?.intro?.split("\n").map((content, idx) => (
              <React.Fragment key={idx}>
                {content}
                <br />
              </React.Fragment>
            ))}
          </span>
        )}
      </div>

      <AppFooter className="footer" />
    </div>
  );
};
