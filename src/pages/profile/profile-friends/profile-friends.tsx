import { getFriendsUrl, serverUrl, userApi } from 'api';
import { UserResponse } from 'model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';

import './profile-friends.scss';

function ProfileFriends({ itemTotal }: any) {
  const userOwn = useSelector(SelectorAccessUser);
  const location = useLocation() as any;
  const [friends, setFriends] = useState([] as UserResponse[]);
  const [userDisplay, setUserDisplay] = useState({} as UserResponse);

  useEffect(() => {
    if(friendRoute(location.pathname)) {
      if(location.state && location.state.user) {
        setUserDisplay(location.state.user);
      } 
    } else {
      setUserDisplay(userOwn);
    }
  }, [location, userOwn])

  useEffect(() => {
    async function getFriendsData() {
      const originFriendsData = {
        _id: userDisplay._id
      }

      const responseUser = await userApi.getFriends(getFriendsUrl, originFriendsData);
      const { status, data } = responseUser;

      if(status === 200 && data.status === 'success' && data.friends) {
        setFriends(data.friends);
      }
    }

    if(userDisplay._id && userDisplay._id) {
      getFriendsData();
    }
  }, [userDisplay])

  function friendRoute(pathName: string): boolean {
    const paths = pathName.split('/');
    return paths[1].includes('friends');
  }

  function getEmptyItem(itemTotal: number) {
    const emptyItems = [];
    
    for (let index = 0; index < itemTotal; index++) {
      emptyItems.push({ id: index });
    }

    return emptyItems;
  }

  function getFullName(first_name: string = '', last_name: string = ''): string { 
    return `${first_name} ${last_name}`;
  }

  return (
    <div className="profile-friends-conatiner">
      <div className="friends-header">Bạn bè</div>
      <div className="friends-list">
        {
          friends.map((friend: UserResponse) => {
            return (
              <div key={friend._id} className="friends-item">
                <span className="item-image">
                  <img src={serverUrl + friend.avatar} alt="" />
                </span>
                <span className="item-name">{ getFullName(friend.first_name, friend.last_name) }</span>
              </div>
            )
          })
        }
        {
          getEmptyItem(itemTotal).map(item => <div key={item.id} className="friends-item friends-item-fix"></div>)
        }
      </div>
    </div>
  );
}

export default ProfileFriends;
