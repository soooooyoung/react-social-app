import { EditOutlined } from "@ant-design/icons";
import { Card, Input, Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSaveLike, useDeleteLike } from "../../api/like";
import {
  useFetchAllPosts,
  useSavePost,
  useUpdatePost,
  useDeletePost,
} from "../../api/post";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAuth } from "../../app/redux/authSlice";
import { selectComment, setComment } from "../../app/redux/commentSlice";
import { selectPost, setPost, resetPost } from "../../app/redux/postSlice";
import { Post } from "../../models";
import { showErrorModal } from "../../utils/responseUtils";
import { CommentCard } from "./CommentCard";
import { PostCard } from "./PostCard";

interface Props {
  currentId?: number;
}

export const PostList = ({ currentId }: Props) => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const comment = useAppSelector(selectComment);
  const userId = useAppSelector(selectAuth).user?.userId;
  const { t } = useTranslation();
  const { data, refetch } = useFetchAllPosts(currentId);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [commentMode, setCommentMode] = useState<boolean>(true);
  const { mutateAsync: savePostAsync } = useSavePost(userId);
  const { mutateAsync: updatePostAsync } = useUpdatePost(userId);
  const { mutateAsync: deletePostAsync } = useDeletePost(userId);
  const { mutateAsync: saveLikeAsync } = useSaveLike(userId);
  const { mutateAsync: deleteLikeAsync } = useDeleteLike(userId);

  const handleChangePostInput = (post: Post) => {
    dispatch(setPost(post));
  };

  const handleSubmitPost = async () => {
    if (!isValidContent(post.content)) {
      return;
    }
    await savePostAsync(post, {
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: () => {
        dispatch(resetPost());
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

  const handleUpdatePost = async () => {
    if (!editMode || !isValidContent(post.content)) {
      return;
    }
    await updatePostAsync(post, {
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: () => {
        dispatch(resetPost());
      },
    });
  };

  const handleLikePost = async (postId: number) => {
    await saveLikeAsync(
      { postId },
      {
        onError: (e) => {
          showErrorModal(e.message);
        },
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleUnlikePost = async (postId: number) => {
    await deleteLikeAsync(postId, {
      onError: (e) => {
        showErrorModal(e.message);
      },
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handleClickEditButton = async (selectedPost: Post) => {
    if (editMode) {
      await handleUpdatePost();
      dispatch(resetPost());
      setEditMode(false);
    } else {
      dispatch(setPost(selectedPost));
      setEditMode(true);
    }
  };

  const handleClickLikeButton = async (selectedPost: Post) => {
    const postId = selectedPost.postId;
    if (!postId) {
      return;
    }
    if (selectedPost.likedIds?.find((id) => id === userId)) {
      await handleUnlikePost(postId);
    } else {
      await handleLikePost(postId);
    }
  };

  const handleClickCommentButton = (mode: boolean, postId?: number) => {
    dispatch(setComment({ postId }));
    setCommentMode(commentMode ? mode : true);
  };

  const isValidContent = (text?: string) => {
    if (!text || text.replace(/\s/g, "").length < 1 || text === undefined) {
      return false;
    }
    return true;
  };

  return (
    <div className="list">
      {currentId === userId && (
        <div className="card-wrapper">
          <Card className="card">
            <div className="text-wrapper">
              <Input.TextArea
                className="text-area"
                autoFocus
                rows={3}
                value={editMode ? "" : post.content}
                autoSize={{ minRows: 2, maxRows: 6 }}
                maxLength={500}
                placeholder={`${t("Write your thoughts...")}`}
                onFocus={() => setEditMode(false)}
                onChange={(e) => {
                  handleChangePostInput({ content: e.target.value });
                }}
              />
              <Button icon={<EditOutlined />} onClick={handleSubmitPost} />
            </div>
          </Card>
        </div>
      )}
      {data?.map((item, idx) => (
        <div key={idx}>
          <PostCard
            item={item}
            editMode={editMode && item.postId === post.postId}
            onToggleEdit={() => {
              handleClickEditButton(item);
            }}
            onToggleLike={() => {
              handleClickLikeButton(item);
            }}
            onToggleComment={(mode) => {
              handleClickCommentButton(mode, item.postId);
            }}
            onDelete={() => {
              if (item.postId) handleDeletePost(item.postId);
            }}
            onChange={(post) => {
              handleChangePostInput(post);
            }}
          />
          {commentMode && comment.postId === item.postId && (
            <CommentCard postId={item.postId} />
          )}
        </div>
      ))}
    </div>
  );
};
