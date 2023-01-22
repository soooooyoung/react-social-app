import React from "react";
import {
  CameraFilled,
  DeleteFilled,
  EditFilled,
  QuestionCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Input, Popconfirm } from "antd";
import { ChangeEvent, useState } from "react";
import { useFetchUser, useUpdateUser } from "../../api/user";
import { getUsername } from "../../utils/stringUtils";
import { FileUploader } from "../FileUploader";
import { AppFooter } from "../layout/AppFooter";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { useDeleteImageProfile, useSaveImageProfile } from "../../api/file";
import { env } from "../../config/env";
import "./Profile.scss";
import { showErrorModal } from "../../utils/responseUtils";

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
        onError: () => {
          showErrorModal(
            "Failed To Upload",
            "Please make sure your file is less than 2mb in size and in correct format"
          );
        },
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
        {" "}
        <span className="username">{getUsername(data)}</span>
        <div className="profile-img-container">
          <Avatar
            shape="square"
            size={size || 240}
            icon={<UserOutlined />}
            src={data?.profileImgUrl && `${env.server}${data?.profileImgUrl}`}
          />
        </div>
        <div className="content-ui">
          <FileUploader
            onUpload={handleFileUpload}
            icon={<CameraFilled className="uploadBtn" />}
          />
          {data?.profileImgUrl && (
            <Popconfirm
              overlayStyle={{ position: "fixed" }}
              showArrow={false}
              icon={<QuestionCircleFilled style={{ color: "#ffb3c1" }} />}
              title="Delete Profile Image"
              description="Are you sure you want to delete your picture?"
              onConfirm={handleFileDelete}
            >
              <DeleteFilled className="deleteBtn" />
            </Popconfirm>
          )}
          <div className="content-space" />
          <EditFilled className="editBtn" onClick={handleClickEditButton} />
        </div>
        {editMode ? (
          <Input.TextArea
            className="text-area"
            onChange={handleChangeEditValue}
            onBlur={handleClickEditButton}
            maxLength={500}
            value={editValue}
          />
        ) : (
          <span className="description">
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
