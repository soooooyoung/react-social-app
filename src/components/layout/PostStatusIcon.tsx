import {
  GlobalOutlined,
  TeamOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { PostStatus } from "../../models";

interface Props {
  postStatus?: PostStatus;
}

export const PostStatusIcon = ({ postStatus }: Props) => {
  const postIcon = {
    G: <GlobalOutlined />,
    P: <LockOutlined />,
    F: <TeamOutlined />,
    B: <EyeInvisibleOutlined />,
  };

  const postTitle = {
    G: "Global",
    P: "Private",
    F: "Friends Only",
    B: "Blocked",
  };
  if (postStatus)
    return (
      <Tooltip color="#ffb3c1" title={postTitle[postStatus]}>
        {postIcon[postStatus]}
      </Tooltip>
    );
  return <></>;
};
