import { Avatar, Drawer, Modal, Popconfirm, Skeleton, Spin } from "antd";
import {
  MessageOutlined,
  QuestionCircleFilled,
  UserAddOutlined,
  UserDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDeleteFriendRequest, useFetchAllFriends } from "../../api/friend";
import { selectAuth } from "../../app/redux/authSlice";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { getFileUrl } from "../../utils/stringUtils";
import { useTranslation } from "react-i18next";
import { FriendEdit } from "./FriendEdit";
import "../../style/FriendList.scss";
import { User } from "../../models";
import { showErrorModal } from "../../utils/responseUtils";
import { Socket } from "socket.io-client";
import { ChatLogManager } from "../ChatLogManager";

interface Props {
  socket: Socket;
  onClickFriend?: (friendId: number) => void;
}

export const Friendlist = ({ onClickFriend, socket }: Props) => {
  const { t } = useTranslation();
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuth);
  const [currentFriend, setCurrentFriend] = useState<string>("");
  const { data: friends, refetch } = useFetchAllFriends(user?.userId, {
    enabled: !!user?.userId,
  });
  const { mutateAsync: deleteFriendRequest } = useDeleteFriendRequest();

  const handleDeleteFriendship = async (friend: User) => {
    if (user && user.userId && friend.userId) {
      await deleteFriendRequest(`${user.userId}/${friend.userId}`, {
        onError: () => {
          showErrorModal(`${t("Friend Delete Failed")}`);
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

  const handleOpenChat = (addressee: string) => {
    setCurrentFriend(addressee);
    socket.emit("join_private", addressee);
    setChatVisible(true);
  };
  const handleCloseChat = () => {
    socket.emit("leave_private", currentFriend);
    setCurrentFriend("");

    setChatVisible(false);
  };
  const handleClickFriend = (friendId: number) => {
    if (onClickFriend) {
      onClickFriend(friendId);
    }
  };

  return (
    <div className="friendlist">
      <div className="contacts-title">
        <span>{t("Contacts")}</span>
        <UserAddOutlined className="ui-icon" onClick={handleClickAddButton} />
      </div>
      <div className="contacts">
        {friends &&
          friends.map((item, idx) => (
            <div className="item horizontal" key={idx}>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src={getFileUrl(item?.profileImgUrl)}
              />
              <span
                className="ui-icon"
                onClick={() => handleClickFriend(item.userId)}
              >
                {item.username}
              </span>
              <div className="flex-space" />
              <MessageOutlined
                className="ui-icon"
                onClick={() => handleOpenChat(item.username)}
              />
              <Popconfirm
                overlayStyle={{ position: "fixed" }}
                showArrow={false}
                icon={<QuestionCircleFilled style={{ color: "#ffb3c1" }} />}
                title="Delete Friend"
                description="Are you sure you want to delete your friend?"
                onConfirm={() => handleDeleteFriendship(item)}
              >
                <UserDeleteOutlined className="ui-icon" />
              </Popconfirm>
            </div>
          ))}
      </div>
      {/* Modal */}
      <Modal
        wrapClassName="modal"
        footer={null}
        closable={false}
        open={modalVisible}
        onCancel={handleCloseModal}
        destroyOnClose
      >
        <FriendEdit user={user} />
      </Modal>

      <Drawer
        title={<span className="bold">Private Chat with {currentFriend}</span>}
        placement="bottom"
        open={chatVisible}
        onClose={handleCloseChat}
        closeIcon={null}
        destroyOnClose
      >
        <Skeleton loading={false}>
          <div style={{ height: "100%", width: "100%", display: "flex" }}>
            <ChatLogManager socket={socket} addressee={currentFriend} />
          </div>
        </Skeleton>
      </Drawer>
    </div>
  );
};
