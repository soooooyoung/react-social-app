import {
  CommentOutlined,
  EditOutlined,
  LikeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, Input, List } from "antd";
import {
  useDeletePost,
  useFetchAllPosts,
  useSavePost,
  useUpdatePost,
} from "../api/post";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Post } from "../models";
import { showErrorModal } from "../utils/responseUtils";
import { selectAuth } from "../app/authSlice";
import {
  resetSelectedPost,
  selectPost,
  setNewContent,
  setSelectedContent,
  setSelectedPost,
} from "./postSlice";
import "./HomePage.css";
import React from "react";

export const HomePage = () => {
  /**
   * State Management
   */
  const { selectedPost, selectedPostContent, newPostContent } =
    useAppSelector(selectPost);
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  /**
   * Query
   */
  const { data } = useFetchAllPosts(user?.userId);
  const { mutateAsync: savePostAsync } = useSavePost(user?.userId);
  const { mutateAsync: updatePostAsync } = useUpdatePost(user?.userId);
  const { mutateAsync: deletePostAsync } = useDeletePost(user?.userId);

  const handleSubmitPost = async () => {
    if (
      !newPostContent ||
      newPostContent.replace(/\s/g, "").length < 1 ||
      newPostContent === undefined
    ) {
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
      selectedPostContent === "undefined" ||
      selectedPostContent.replace(/\s/g, "").length < 1
    ) {
      return;
    }
    await updatePostAsync(
      {
        postId: selectedPost,
        content: selectedPostContent,
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

  const handleClickEditButton = async (post: Post) => {
    if (selectedPost) {
      await handleUpdatePost();
      return;
    }
    dispatch(setSelectedPost(post));
  };

  return (
    <div className="container">
      <List className="list" size="large" itemLayout="vertical">
        <List.Item>
          <Card className="card">
            <div className="content-wrapper">
              <Input.TextArea
                className="text-area"
                autoFocus
                rows={3}
                autoSize={{ minRows: 2, maxRows: 6 }}
                maxLength={500}
                value={newPostContent}
                onChange={(e) => {
                  dispatch(setNewContent(e.target.value));
                }}
              />
              <EditOutlined onClick={handleSubmitPost} />
            </div>
          </Card>
        </List.Item>
        {data?.map((item, idx) => (
          <List.Item key={idx}>
            <Card
              className="card"
              actions={[
                <LikeOutlined key="like" />,
                <CommentOutlined key="comment" />,
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
                  selectedPost && selectedPost === item.postId ? (
                    <Input.TextArea
                      className="textArea"
                      bordered={false}
                      maxLength={500}
                      autoSize={{ minRows: 2, maxRows: 6 }}
                      value={selectedPostContent}
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
                description={item.created_date}
              />
            </Card>
          </List.Item>
        ))}{" "}
      </List>
    </div>
  );
};
