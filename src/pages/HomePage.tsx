import React, { useState } from "react";
import dayjs from "dayjs";
import {
  EditOutlined,
  DeleteOutlined,
  BulbFilled,
  GlobalOutlined,
  LockOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Popconfirm } from "antd";
import {
  useDeletePost,
  useFetchAllPosts,
  useSavePost,
  useUpdatePost,
} from "../api/post";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Friendlist } from "../components/layout/FriendList";
import { Profile } from "../components/layout/Profile";
import { showErrorModal } from "../utils/responseUtils";
import { selectAuth } from "../app/redux/authSlice";
import {
  resetSelectedPost,
  selectPost,
  setNewContent,
  setSelectedContent,
  setSelectedPost,
} from "../app/redux/postSlice";
import { Post, PostStatus } from "../models";
import "../style/HomePage.scss";
import { useTranslation } from "react-i18next";
import { PostStatusIcon } from "../components/layout/PostStatusIcon";
import { Selector } from "../components/layout/Selector";

const postStatusOptions = [
  { label: <GlobalOutlined className="ui-icon" />, value: "G" },
  { label: <LockOutlined className="ui-icon" />, value: "P" },
  { label: <TeamOutlined className="ui-icon" />, value: "F" },
];

export const HomePage = () => {
  const { t } = useTranslation();
  /**
   * State Management
   */
  const { selectedPost, selectedPostContent, newPostContent } =
    useAppSelector(selectPost);
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const [postStatus, setPostStatus] = useState<PostStatus>("G");
  const [editMode, setEditMode] = useState<boolean>(false);
  /**
   * Query
   */
  const { data } = useFetchAllPosts(user?.userId);
  const { mutateAsync: savePostAsync } = useSavePost(user?.userId);
  const { mutateAsync: updatePostAsync } = useUpdatePost(user?.userId);
  const { mutateAsync: deletePostAsync } = useDeletePost(user?.userId);

  const isValidContent = (text?: string) => {
    if (!text || text.replace(/\s/g, "").length < 1 || text === undefined) {
      return false;
    }
    return true;
  };

  const handleSubmitPost = async () => {
    if (!isValidContent(newPostContent)) {
      return;
    }
    await savePostAsync(
      {
        userId: user?.userId,
        content: newPostContent,
      },
      {
        onError: (e) => {
          showErrorModal(e.message);
        },
        onSuccess: () => {
          dispatch(setNewContent(""));
        },
      }
    );
  };

  const handleDeletePost = async (postId: number) => {
    await deletePostAsync(postId, {
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: () => {},
    });
  };

  const handleUpdatePost = async () => {
    if (
      !selectedPost ||
      !selectedPostContent ||
      selectedPostContent.replace(/\s/g, "").length < 1
    ) {
      return;
    }
    await updatePostAsync(
      {
        postId: selectedPost,
        content: selectedPostContent,
        statusCode: postStatus,
      },
      {
        onError: (e) => {
          showErrorModal(e.message);
        },
        onSuccess: () => {
          dispatch(resetSelectedPost());
        },
      }
    );
  };

  const handleSelectPostStatus = (status: PostStatus, post: Post) => {
    setPostStatus(status);
    dispatch(setSelectedPost(post));
  };

  const handleClickEditButton = async (post: Post) => {
    if (editMode && selectedPost === post.postId) {
      await handleUpdatePost();
      setEditMode(false);
    } else {
      dispatch(setSelectedPost(post));
      setEditMode(true);
    }
  };

  return (
    <div className="home-container">
      <div className="sider">
        <Profile userId={user?.userId} />
      </div>
      <div className="list">
        <div className="card-wrapper">
          <Card className="card">
            <div className="text-wrapper">
              <Input.TextArea
                className="text-area"
                autoFocus
                rows={3}
                autoSize={{ minRows: 2, maxRows: 6 }}
                maxLength={500}
                value={newPostContent}
                placeholder={`${t("Write your thoughts...")}`}
                onChange={(e) => {
                  dispatch(setNewContent(e.target.value));
                }}
              />
              <Button
                disabled={!isValidContent(newPostContent)}
                icon={<EditOutlined />}
                onClick={handleSubmitPost}
              />
            </div>
          </Card>
        </div>
        {data &&
          data.map((item, idx) => (
            <div key={idx} className="card-wrapper">
              <Card
                className="card"
                extra={
                  selectedPost === item.postId ? (
                    <Selector
                      style={{
                        display: "flex",
                        gap: 16,
                        margin: "auto",
                        justifyContent: "center",
                      }}
                      options={postStatusOptions}
                      value={postStatus}
                      onSelect={(status) =>
                        handleSelectPostStatus(status as PostStatus, item)
                      }
                    />
                  ) : (
                    <div
                      className="ui-icon"
                      onClick={() => handleClickEditButton(item)}
                    >
                      <PostStatusIcon postStatus={item.statusCode} />
                    </div>
                  )
                }
                actions={[
                  // <LikeOutlined key="like"  />,
                  // <CommentOutlined key="comment"  />,
                  <EditOutlined
                    key="edit"
                    onClick={() => handleClickEditButton(item)}
                  />,

                  <DeleteOutlined
                    key="delete"
                    onClick={() => item.postId && handleDeletePost(item.postId)}
                  />,
                ]}
              >
                <Card.Meta
                  title={
                    editMode && item.postId === selectedPost ? (
                      <Input.TextArea
                        className="textArea"
                        bordered={false}
                        maxLength={500}
                        autoSize={{ minRows: 2, maxRows: 10 }}
                        value={selectedPostContent}
                        onBlur={handleUpdatePost}
                        onChange={(e) => {
                          dispatch(setSelectedContent(e.target.value));
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
          ))}
      </div>
      <div className="sider">
        <Friendlist />
      </div>
    </div>
  );
};
