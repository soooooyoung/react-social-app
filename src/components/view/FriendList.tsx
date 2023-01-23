import { Avatar, Modal } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useFetchAllFriends, useSaveFriendRequest } from "../../api/friend";
import { selectAuth } from "../../app/authSlice";
import { useAppSelector } from "../../app/hooks";
import "./FriendList.scss";
import { useState } from "react";
import { SearchInput } from "../SearchInput";
import { useFetchUsers } from "../../api/user";
import { getFileUrl } from "../../utils/stringUtils";
import { showErrorModal } from "../../utils/responseUtils";

export const Friendlist = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuth);
  const { data } = useFetchAllFriends(user?.userId, {
    enabled: !!user?.userId,
    retry: false,
  });

  const { mutateAsync } = useSaveFriendRequest();
  const { data: users } = useFetchUsers(
    { keyword },
    {
      enabled: !!keyword && modalVisible,
      retry: false,
    }
  );
  const handleClickAddButton = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleSearchFriend = (value?: string) => {
    if (value) {
      console.log(value);
      setKeyword(value);
    }
  };

  return (
    <div className="friendlist">
      <div className="contacts-title">
        <span>Contacts</span>
        <a onClick={handleClickAddButton}>+ Add</a>
      </div>

      <div className="contacts">
        {data &&
          data.map((item, idx) => (
            <div className="item" key={idx}>
              <Avatar
                size="large"
                icon={<UserOutlined />}
                src={item.profileImgUrl}
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
        {users?.map((item, idx) => (
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
              onClick={async () => {
                if (user && user.userId) {
                  await mutateAsync(
                    {
                      requesterId: user.userId,
                      addresseeId: 9,
                    },
                    {
                      onError: () => {
                        showErrorModal("친구 요청에 실패했습니다");
                      },
                    }
                  );
                }
              }}
            />
          </div>
        ))}
      </Modal>
    </div>
  );
};
