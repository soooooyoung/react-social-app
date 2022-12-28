import {
  CommentOutlined,
  EditOutlined,
  LikeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, Input, List, Space } from "antd";
import { useState } from "react";
import { useDeletePost, useFetchAllPosts, useSavePost } from "../api/post";
import { selectAuth } from "../app/authSlice";
import { useAppSelector } from "../app/hooks";
import { Post } from "../models";
import { showErrorModal } from "../utils/responseUtils";
import "./HomePage.css";

export const HomePage = () => {
  const { user } = useAppSelector(selectAuth);
  const { data } = useFetchAllPosts(user?.userId);
  const { mutateAsync: savePostAsync } = useSavePost(user?.userId);
  const { mutateAsync: deletePostAsync } = useDeletePost(user?.userId);
  const [userInput, setUserInput] = useState<string>("");

  const handleSubmitPost = async () => {
    if (userInput.replace(/\s/g, "").length < 1 || userInput === undefined) {
      return;
    }
    const newPost: Post = {
      userId: user?.userId,
      content: userInput,
    };
    await savePostAsync(newPost, {
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: () => {
        setUserInput("");
      },
    });
  };

  const handleDeletePost = async (postId: number) => {
    await deletePostAsync(postId, {
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: () => {},
    });
  };

  return (
    <div className="container">
      <List className="list" size="large" itemLayout="vertical">
        <List.Item>
          <Card className="card">
            <div className="content-wrapper">
              <Input.TextArea
                autoFocus
                rows={3}
                maxLength={200}
                style={{ resize: "none", whiteSpace: "pre-wrap" }}
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
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
                <EditOutlined key="edit" />,
                <DeleteOutlined
                  key="delete"
                  onClick={() => item.postId && handleDeletePost(item.postId)}
                />,
              ]}
            >
              <Card.Meta
                title={
                  <span>
                    {item.content?.split("\n").map((content) => (
                      <>
                        {content}
                        <br />
                      </>
                    ))}
                  </span>
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
