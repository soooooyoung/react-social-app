import {
  GlobalOutlined,
  TeamOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
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
  if (postStatus) return postIcon[postStatus];
  return <></>;
};
