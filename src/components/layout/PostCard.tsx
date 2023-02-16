import dayjs from "dayjs";
import React from "react";
import {
  LikeOutlined,
  EditOutlined,
  DeleteOutlined,
  GlobalOutlined,
  LockOutlined,
  TeamOutlined,
  CheckOutlined,
  HeartFilled,
  LikeFilled,
  CommentOutlined,
} from "@ant-design/icons";
import { Card, Input } from "antd";
import { Post } from "../../models";
import { PostStatusIcon } from "./PostStatusIcon";
import { Selector } from "./Selector";
import { useAppSelector } from "../../app/hooks";
import { selectPost } from "../../app/redux/postSlice";
import { selectAuth } from "../../app/redux/authSlice";

interface Props {
  item: Post;
  idx?: string | number;
  editMode?: boolean;
  onToggleEdit?: () => void;
  onToggleLike?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onChange?: (post: Post) => void;
}

const postStatusOptions = [
  { label: <GlobalOutlined className="ui-icon" />, value: "G" },
  { label: <LockOutlined className="ui-icon" />, value: "P" },
  { label: <TeamOutlined className="ui-icon" />, value: "F" },
];

export const PostCard = ({
  editMode,
  item,
  idx,
  onToggleEdit,
  onToggleLike,
  onDelete,
  onChange,
  onSave,
}: Props) => {
  const post = useAppSelector(selectPost);
  const userId = useAppSelector(selectAuth).user?.userId;

  const handleToggleEdit = () => {
    if (onToggleEdit) onToggleEdit();
  };

  const handleToggleLike = () => {
    if (onToggleLike) onToggleLike();
  };

  const handleChange = (post: Post) => {
    if (onChange) onChange(post);
  };

  const handleSave = () => {
    if (onSave) onSave();
  };

  const handleDelete = () => {
    if (onDelete) onDelete();
  };

  return (
    <div key={idx} className="card-wrapper">
      <Card
        className="card"
        extra={
          editMode ? (
            <Selector
              style={{
                display: "flex",
                gap: 16,
                margin: "auto",
                justifyContent: "center",
              }}
              onSelect={(value) => {
                handleChange({
                  ...item,
                  statusCode: value as Post["statusCode"],
                });
              }}
              options={postStatusOptions}
              value={post.statusCode}
            />
          ) : (
            <div className="ui-icon" onClick={handleToggleEdit}>
              <PostStatusIcon postStatus={item.statusCode} />
            </div>
          )
        }
        actions={[
          <div key="like" onClick={handleToggleLike}>
            {item.likedIds?.length}{" "}
            {item.likedIds?.find((id) => id === userId) ? (
              <LikeFilled />
            ) : (
              <LikeOutlined />
            )}
          </div>,
          <CommentOutlined key="comment" />,
          editMode ? (
            <CheckOutlined key="edit" onClick={handleToggleEdit} />
          ) : (
            <EditOutlined key="edit" onClick={handleToggleEdit} />
          ),

          <DeleteOutlined key="delete" onClick={handleDelete} />,
        ]}
      >
        <Card.Meta
          title={
            editMode ? (
              <Input.TextArea
                className="textArea"
                bordered={false}
                maxLength={500}
                autoSize={{ minRows: 2, maxRows: 10 }}
                value={post.content}
                onBlur={handleSave}
                onChange={(e) => {
                  handleChange({ ...item, content: e.target.value });
                }}
              />
            ) : (
              <span className="text">
                {item.content?.split("\n").map((content, idx) => (
                  <React.Fragment key={idx}>
                    {content}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            )
          }
          description={
            <div>
              {dayjs(item.created_date).format("YYYY.MM.DD HH:mm:ss")}
              {item.updated_date !== "0000-00-00 00:00:00" &&
                ` / Updated: ${dayjs(item.updated_date).format(
                  "YYYY.MM.DD HH:mm:ss"
                )}`}
            </div>
          }
        />
      </Card>
    </div>
  );
};
