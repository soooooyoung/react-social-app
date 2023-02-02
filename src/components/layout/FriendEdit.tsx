import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useState } from "react";
import {
  useSaveFriendRequest,
  useUpdateFriendRequest,
  useDeleteFriendRequest,
} from "../../api/friend";
import { t } from "i18next";
import { useFetchUsers } from "../../api/user";
import { User } from "../../models";
import { showErrorModal } from "../../utils/responseUtils";
import { getFileUrl } from "../../utils/stringUtils";
import { SearchInput } from "../SearchInput";

interface Props {
  user?: User;
}

export const FriendEdit = ({ user }: Props) => {
  const [keyword, setKeyword] = useState<string>("");
  const { mutateAsync: saveFriendRequest } = useSaveFriendRequest();
  const { mutateAsync: updateFriendRequest } = useUpdateFriendRequest();
  const { mutateAsync: deleteFriendRequest } = useDeleteFriendRequest();
  const { data: users, refetch } = useFetchUsers({ q: keyword });

  const handleRequestFriend = async (friend: User) => {
    if (user && user.userId && friend.userId) {
      await saveFriendRequest(
        {
          requesterId: user.userId,
          addresseeId: friend.userId,
        },
        {
          onError: () => {
            showErrorModal(`${t("Friend Request Failed")}`);
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
            showErrorModal(`${t("Friend Accept Failed")}`);
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
          showErrorModal(`${t("Friend Delete Failed")}`);
        },
        onSuccess: async () => {
          await refetch();
        },
      });
    }
  };

  const handleSearchFriend = (value?: string) => {
    if (value) {
      console.log(value);
      setKeyword(value);
    }
  };

  return (
    <>
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
                  {t("Cancel")}
                </Button>
              ) : (
                <>
                  <Button
                    type="dashed"
                    onClick={() => handleDeleteFriendship(item)}
                  >
                    {t("Deny")}
                  </Button>
                  <Button
                    type="dashed"
                    onClick={() => handleAcceptFriendship(item)}
                  >
                    {t("Accept")}
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
    </>
  );
};
