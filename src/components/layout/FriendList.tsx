import { Avatar, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useFetchAllFriends } from "../../api/friend";
import { selectAuth } from "../../app/redux/authSlice";
import { useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { getFileUrl } from "../../utils/stringUtils";
import { useTranslation } from "react-i18next";
import { FriendEdit } from "./FriendEdit";
import "../../style/FriendList.scss";

export const Friendlist = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { user } = useAppSelector(selectAuth);
  const { data: friends } = useFetchAllFriends(user?.userId, {
    enabled: !!user?.userId,
  });

  const handleClickAddButton = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <div className="friendlist">
      <div className="contacts-title">
        <span>{t("Contacts")}</span>
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
    </div>
  );
};
