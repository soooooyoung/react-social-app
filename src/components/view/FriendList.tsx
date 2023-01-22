import { Avatar, Modal } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useFetchAllFriends, useSaveFriendRequest } from "../../api/friend";
import { selectAuth } from "../../app/authSlice";
import { useAppSelector } from "../../app/hooks";
import "./FriendList.scss";
import { useState } from "react";
import { SearchInput } from "../SearchInput";
import { useFetchUsers } from "../../api/user";

export const Friendlist = () => {
  const { user } = useAppSelector(selectAuth);
  const { data } = useFetchAllFriends(user?.userId, {
    enabled: !!user?.userId,
    retry: false,
  });
  const { data: userQueries } = useFetchUsers(
    {},
    {
      enabled: false,
      retry: false,
    }
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { mutateAsync } = useSaveFriendRequest();

  const handleClickAddButton = () => {
    setModalVisible(true);
  };

  const handleSearchFriend = (value?: string) => {
    if (value) {
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
        open={modalVisible}
        footer={null}
        closable={false}
        destroyOnClose
        onCancel={() => setModalVisible(false)}
      >
        <SearchInput
          placeholder="Search for friend"
          onSearch={handleSearchFriend}
          prefix={null}
          suffix={<SearchOutlined />}
        />
      </Modal>
      {/* <button
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
      >
        add
      </button> */}
    </div>
  );
};
