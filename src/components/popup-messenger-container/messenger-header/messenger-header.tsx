
import { removeConversation, useGlobalContext } from "hook";
import { IGlobalState, UserResponse } from "model";
import { memo, useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { SelectorAccessUser } from "redux/reducers/authentication.reducer";

import './messenger-header.scss';

function MessengerHeader({ conversationId, members }: any) {
  const [, dispatch] = useGlobalContext() as [IGlobalState, any];
  const userOwner = useSelector(SelectorAccessUser);
  const [userDisplay, setUserDisplay] = useState({} as UserResponse);

  const getUserDisplay = useCallback((members: UserResponse[]) => {
    return members.find((member: UserResponse) => member._id !== userOwner._id) || {} as UserResponse;
  }, [userOwner._id])

  useEffect(() => {
    const user = getUserDisplay(members);
    setUserDisplay(user);
  }, [members, getUserDisplay])

  function handleCLoseConversation() {
    dispatch(removeConversation(conversationId))
  }

  function getFullName(first_name: string = '', last_name: string = ''): string { 
    return `${first_name} ${last_name}`;
  }

  return (
    <div className="popup-header">
      <span className="popup-name">
        { userDisplay && getFullName(userDisplay.first_name, userDisplay.last_name)}
      </span>
      <span className="popup-close" onClick={handleCLoseConversation}>
        <AiOutlineClose />
      </span>
    </div>
  );
}

export default memo(MessengerHeader);
