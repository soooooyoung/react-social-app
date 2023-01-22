import {
  CameraOutlined,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Input, Popconfirm } from "antd";
import React from "react";
import { ChangeEvent, useState } from "react";
import { useFetchUser, useUpdateUser } from "../../api/user";
import { getUsername } from "../../utils/stringUtils";
import { FileUploader } from "../FileUploader";
import { AppFooter } from "../layout/AppFooter";
import { UploadRequestOption } from "rc-upload/lib/interface";
import "./Profile.scss";
import { useDeleteImageProfile, useSaveImageProfile } from "../../api/file";
import { env } from "../../config/env";

interface Props {
  userId?: number;
  size?: number;
}

export const Profile = ({ userId, size }: Props) => {
  const { data, refetch } = useFetchUser(userId, {
    enabled: !!userId,
  });
  const { mutateAsync: uploadImage } = useSaveImageProfile(userId);
  const { mutateAsync: deleteImage } = useDeleteImageProfile(userId);
  const { mutateAsync: updateUser } = useUpdateUser(userId);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>();

  const toggleEditMode = async () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditValue(data?.intro);
    } else {
      await updateUser({
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

  const handleFileUpload = async (option: UploadRequestOption<any>) => {
    await uploadImage(
      { file: option.file },
      {
        onSuccess: async (data) => {
          if (option.onSuccess) option.onSuccess({}, data.request);
          await refetch();
        },
      }
    );
  };
  const handleFileDelete = async () => {
    await deleteImage("", {
      onSuccess: async () => {
        await refetch();
      },
    });
  };

  return (
    <div className="profile">
      <div className="content">
        <div className="content-ui">
          <FileUploader onUpload={handleFileUpload} icon={<CameraOutlined />} />
          {data?.profileImgUrl && (
            <Popconfirm
              showArrow={false}
              icon={<QuestionCircleOutlined style={{ color: "#ffb3c1" }} />}
              title="Delete Profile Image"
              description="Are you sure you want to delete your picture?"
              onConfirm={handleFileDelete}
            >
              <DeleteOutlined className="deleteBtn" />
            </Popconfirm>
          )}{" "}
          <div className="content-space" />
          <EditOutlined className="editBtn" onClick={handleClickEditButton} />
        </div>

        <div className="profile-img-container">
          <Avatar
            shape="square"
            size={size || 240}
            icon={<UserOutlined />}
            src={data?.profileImgUrl && `${env.server}${data?.profileImgUrl}`}
          />
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
