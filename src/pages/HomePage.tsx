import {
  CommentOutlined,
  EditOutlined,
  LikeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Card, List } from "antd";
import { useFetchAllPosts } from "../api/post";
import { selectAuth } from "../app/authSlice";
import { useAppSelector } from "../app/hooks";
import "./HomePage.css";

export const HomePage = () => {
  const { user } = useAppSelector(selectAuth);
  const { data } = useFetchAllPosts(user?.userId);

  return (
    <div className="container">
      <List className="list" size="large" itemLayout="vertical">
        {data?.map((item, idx) => (
          <List.Item key={idx}>
            <Card
              className="card"
              actions={[
                <LikeOutlined key="like" />,
                <CommentOutlined key="comment" />,
                <EditOutlined key="edit" />,
                <DeleteOutlined key="delete" />,
              ]}
            >
              <Card.Meta title={item.content} description={item.created_date} />
            </Card>
          </List.Item>
        ))}{" "}
      </List>
    </div>
  );
};
