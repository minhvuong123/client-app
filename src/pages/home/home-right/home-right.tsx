import { getFriendsUrl, serverUrl, userApi } from 'api';
import { conversationApi, getConvsersationUrl } from 'api/conversation.api';
import { setConversation, useGlobalContext } from 'hook';
import { IConversation, IGlobalState, UserResponse } from 'model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';

import './home-right.scss';

function HomeRight() {
  const user = useSelector(SelectorAccessUser);
  const [friends, setFriends] = useState([] as UserResponse[]);
  const [globalContext, dispatch] = useGlobalContext() as [IGlobalState, any];

  useEffect(() => {
    async function getFriendsData() {
      const originFriendsData = {
        _id: user._id
      }

      const responseUser = await userApi.getFriends(getFriendsUrl, originFriendsData);
      const { status, data } = responseUser;

      if(status === 200 && data.status === 'success' && data.friends) {
        setFriends(data.friends);
      }
    }

    if(user && user._id) {
      getFriendsData();
    }
  }, [user])

  function getFullName(first_name: string = '', last_name: string = ''): string { 
    return `${first_name} ${last_name}`;
  }

  function isConversation(members: string[], conversation_members: UserResponse[]): boolean {
    return members.every(memberId => conversation_members.some(member => member._id === memberId));
  }

  async function handleConversation(friend: UserResponse) {
    const originConversationData = {
      members: [user._id, friend._id]
    }

    let existConversation = false;
    globalContext.conversations.forEach((conversation: IConversation) => {
      if(isConversation(originConversationData.members, conversation.members)) {
        existConversation = true;
      }
    })

    // get or create conversation and dispatch to globalState
    if(!existConversation) {
      const responseConversation = await conversationApi.getConversation(getConvsersationUrl, originConversationData)
      const { status, data } = responseConversation;
  
      if(status === 200 && data.status === 'success' && data.conversation) {
        dispatch(setConversation(data.conversation as IConversation))
      }
    }

  }

  return (
    <div className="home-right-container">
     <div className="home-right">
        <div className="home-right-header">
          <span>Người Liên hệ</span>
          <div className="home-groups">
            <span>search</span>
          </div>
        </div>
        <div className="home-users">
          {
            friends.map((friend: UserResponse) => {
              return (
                <div key={friend._id} className="user-item" onClick={() => handleConversation(friend)}>
                  <span className="user-icon">
                    <img src={serverUrl + friend.avatar} alt="" />
                  </span>
                  <span className="user-name">{ getFullName(friend.first_name, friend.last_name) }</span>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default HomeRight;
