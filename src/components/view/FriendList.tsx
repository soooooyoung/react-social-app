import { Avatar, Button, Modal } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
  useDeleteFriendRequest,
  useFetchAllFriends,
  useSaveFriendRequest,
  useUpdateFriendRequest,
} from "../../api/friend";
import { selectAuth } from "../../app/authSlice";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { SearchInput } from "../SearchInput";
import { useFetchUsers } from "../../api/user";
import { getFileUrl } from "../../utils/stringUtils";
import { showErrorModal } from "../../utils/responseUtils";
import { User } from "../../models";
import "../../style/FriendList.scss";
import { env } from "process";

export const Friendlist = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuth);
  const { data: friends } = useFetchAllFriends(user?.userId, {
    enabled: !!user?.userId,
  });
  const { data: users, refetch } = useFetchUsers(
    { q: keyword },
    {
      enabled: !!keyword && modalVisible,

      onSuccess: (data) => {
        console.log("suers", data);
      },
    }
  );
  const { mutateAsync: saveFriendRequest } = useSaveFriendRequest();
  const { mutateAsync: updateFriendRequest } = useUpdateFriendRequest();
  const { mutateAsync: deleteFriendRequest } = useDeleteFriendRequest();

  const handleSearchFriend = (value?: string) => {
    if (value) {
      console.log(value);
      setKeyword(value);
    }
  };

  const handleRequestFriend = async (friend: User) => {
    if (user && user.userId && friend.userId) {
      await saveFriendRequest(
        {
          requesterId: user.userId,
          addresseeId: friend.userId,
        },
        {
          onError: () => {
            showErrorModal("친구 요청에 실패했습니다");
          },
          onSuccess: async () => {
            await refetch();
          },
        }
      );
    }
  };

  const handleAcceptFriendship = async (friend: User) => {
    if (user && user.userId && friend.userId) {
      await updateFriendRequest(
        {
          requesterId: friend.userId,
          addresseeId: user.userId,
          statusCode: "A",
        },
        {
          onError: () => {
            showErrorModal("친구 수락에 실패했습니다");
          },
          onSuccess: async () => {
            await refetch();
          },
        }
      );
    }
  };

  const handleDeleteFriendship = async (friend: User) => {
    if (user && user.userId && friend.userId) {
      await deleteFriendRequest(`${user.userId}/${friend.userId}`, {
        onError: () => {
          showErrorModal("Delete Friend Failed");
        },
        onSuccess: async () => {
          await refetch();
        },
      });
    }
  };

  const handleClickAddButton = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <div className="friendlist">
      <div className="contacts-title">
        <span>Contacts</span>
        <a onClick={handleClickAddButton}>+ Add</a>
      </div>

      <div className="contacts">
        {friends &&
          friends.map((item, idx) => (
            <div className="item" key={idx}>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src={getFileUrl(item?.profileImgUrl)}
              />
              <span>{item.username}</span>
            </div>
          ))}
      </div>

      <Modal
        wrapClassName="modal"
        open={modalVisible}
        footer={null}
        closable={false}
        destroyOnClose
        onCancel={handleCloseModal}
      >
        <SearchInput
          style={{ maxWidth: "100%" }}
          placeholder="Search for friend"
          onSearch={handleSearchFriend}
        />
        {users?.map((item, idx) => {
          const isFriend = item.statusCode === "A";
          const isRequested = item.statusCode === "R";
          if (isFriend) {
            return (
              <div className="item" key={idx}>
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  src={getFileUrl(item?.profileImgUrl)}
                />
                <span>{item.username}</span>
              </div>
            );
          } else if (isRequested) {
            return (
              <div className="item" key={idx}>
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  src={getFileUrl(item?.profileImgUrl)}
                />
                <span>{item.username}</span>
                <div className="flex-space" />
                {item.requesterId === user?.userId ? (
                  <Button
                    type="dashed"
                    onClick={() => handleDeleteFriendship(item)}
                  >
                    Cancel Request
                  </Button>
                ) : (
                  <>
                    <Button
                      type="dashed"
                      onClick={() => handleDeleteFriendship(item)}
                    >
                      Deny
                    </Button>
                    <Button
                      type="dashed"
                      onClick={() => handleAcceptFriendship(item)}
                    >
                      Accept
                    </Button>
                  </>
                )}
              </div>
            );
          }

          return (
            <div className="item" key={idx}>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src={getFileUrl(item?.profileImgUrl)}
              />
              <span>{item.username}</span>
              <div className="flex-space" />

              <PlusOutlined
                className="ui-icon"
                onClick={() => handleRequestFriend(item)}
              />
            </div>
          );
        })}
      </Modal>
    </div>
  );
};
