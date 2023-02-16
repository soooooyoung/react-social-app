import { CloseOutlined, DeleteFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Input, List } from "antd";
import { ChangeEvent, useState } from "react";
import {
  useDeleteComment,
  useFetchAllComments,
  useSaveComment,
} from "../../api/comment";
import { useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../app/redux/authSlice";
import { Comment } from "../../models";
import { getFileUrl } from "../../utils/stringUtils";

interface Props {
  postId?: number;
}

export const CommentCard = ({ postId }: Props) => {
  const userId = useAppSelector(selectAuth).user?.userId;
  const { data } = useFetchAllComments(postId);
  const { mutateAsync: saveCommentAsync } = useSaveComment(postId);
  const { mutateAsync: deleteCommentAsync } = useDeleteComment(postId);
  const [inputValue, setInputValue] = useState<string>();

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSaveComment = async () => {
    await saveCommentAsync({
      content: inputValue,
    });
    setInputValue("");
  };

  const handleDeleteComment = async (commentId?: number) => {
    await deleteCommentAsync(`${userId}/${commentId}`);
  };
  console.log(data);
  return (
    <div className="card-wrapper">
      <Card className="card">
        {data && (
          <div className="list-vertical">
            {data.map((item) => (
              <div className="text-wrapper">
                <Avatar src={getFileUrl(item?.profileImgUrl)} />
                <span className="bold">{item.nickname || item.username}</span>
                {item.content}
                <div className="flex-space" />
                {userId === item.userId && (
                  <CloseOutlined
                    className="ui-icon"
                    onClick={() => handleDeleteComment(item.commentId)}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-wrapper">
          <Input value={inputValue} onChange={handleChangeInput} />
          <Button type="primary" onClick={handleSaveComment}>
            comment
          </Button>
        </div>
      </Card>
    </div>
  );
};
