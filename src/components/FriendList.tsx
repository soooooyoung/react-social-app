import { useFetchAllFriends, useSaveFriendRequest } from "../api/friend";
import { selectAuth } from "../app/authSlice";
import { useAppSelector } from "../app/hooks";
import "./FriendList.scss";

export const Friendlist = () => {
  const { user } = useAppSelector(selectAuth);
  const { data } = useFetchAllFriends(user?.userId, {
    enabled: !!user?.userId,
    retry: false,
  });
  const { mutateAsync } = useSaveFriendRequest();

  return (
    <div className="friendlist">
      <div className="contacts-title">
        <span>Contacts</span>
        <a>+ Add</a>
      </div>

      <div className="contacts">
        {data &&
          data.map((item, idx) => (
            <div className="item" key={idx}>
              {item.username}
            </div>
          ))}
      </div>

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
