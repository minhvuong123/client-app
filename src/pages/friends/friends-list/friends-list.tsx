


import { addFriendUrl, suggestFriendsUrl, userApi } from 'api';
import { UserResponse } from 'model';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addUserPreview } from 'redux/actions/user.action';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';
import './friends-list.scss';

function FriendsList() {
  const user = useSelector(SelectorAccessUser) as UserResponse;
  const [friends, setFriends] = useState([] as UserResponse[]);
  const [addedFriendsId, setAddedFriendsId] = useState([] as string[]);
  const dispatch = useDispatch();


  useEffect(() => {
    async function getSuggestFriends() {
      if (user._id) {
        const suggestFriends = await userApi.suggestFriends(suggestFriendsUrl, user._id, 20);
        const { status, data } = suggestFriends
        if (status === 200 && data.friends) {
          setFriends(data.friends);
        }
      }
    }

    getSuggestFriends();
  }, [user])

  function mapName(first_name: string, last_name: string) {
    return `${last_name} ${first_name}`
  }

  async function handleAddFriend(event: any, userId: string, friendId: string) {
    event.preventDefault();

    const friendRespone = await userApi.addFriend(addFriendUrl, userId, friendId);
    const { status, data } = friendRespone;

    if(status === 200 && data.status === "success") {
      // save added friend to hidden button add friend
      const addedFriendsIdClone = [...addedFriendsId];
      addedFriendsIdClone.push(friendId);
      setAddedFriendsId(addedFriendsIdClone);

      // add friend to userPreview in store
      const friend = friends.find(friend => friend._id === friendId);
      if(friend) {
        dispatch(addUserPreview(friend))
      }
    }
  }

  function isAddedFriend(userId: string, addedFriendsId: string[]) {
    return addedFriendsId.includes(userId); 
  }

  return (
    <div className="friends-list-container">
      <h3 className="friends-header">Bạn bè</h3>
      <div className="friends-list">
        <div className="friends-invited">
          <div className="invited-header">Lời mời kết bạn</div>
          <div className="invited-list">
            <span className="invited-not-found">Không có yêu cầu mới</span>
          </div>
        </div>
        <div className="line"></div>
        <div className="friends-know">
          <div className="know-header">Những người bạn có thể biết</div>
          <div className="know-list">
            {
              friends.length > 0
              && friends.map(friend => {
                return (
                  <div key={friend._id} className="know-item">
                    <NavLink to={`/friends/${friend.user_name}/posts`} state={{ userPreview: friend }} className="item-link">
                      <span className="know-item-icon"></span>
                      <div className="know-item-content">
                        <span className="text">{mapName(friend.first_name, friend.last_name)}</span>
                        {/* <span className="together-friend">1 bạn chung</span> */}
                        <div className="actions">
                          <div 
                            className={`action-button add-friend ${isAddedFriend(friend._id, addedFriendsId) ? 'friend-added' : ''}`} 
                            onClick={(event) => handleAddFriend(event, user._id, friend._id)}
                          > Thêm bạn bè</div>
                          <div className="action-button remove-friend">Xóa, gỡ bỏ</div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendsList;
