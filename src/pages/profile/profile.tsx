


import NavBar from 'navbar/nav-bar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserResponse } from 'model';
import { AiFillCamera } from "react-icons/ai";
import PopupUploadAvatar from 'components/popup-upload-avatar/popup-upload-avatar';
import { serverUrl } from 'api';

import './profile.scss';
import { useSelector } from 'react-redux';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';

function Profile({ isShowNavBar }: any) {
  const userOwn = useSelector(SelectorAccessUser);
  const [userDisplay, setUserDisplay] = useState({} as UserResponse);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation() as any;
  const navigate = useNavigate();

  useEffect(() => {
    if(friendRoute(location.pathname)) {
      if(location.state && location.state.user) {
        setUserDisplay(location.state.user);
      } else {
        navigate('/404')
      }
    } else {
      setUserDisplay(userOwn);
    }
  }, [location, userOwn, navigate])

  function handleModal() {
    setOpenModal(true)
  }

  function onChangeModal(value: boolean) {
    setOpenModal(value)
  }

  function getFullName(first_name: string = '', last_name: string = ''): string { 
    return `${first_name} ${last_name}`;
  }

  function getFirstCharacter(first_name: string = ''): string {
    return first_name[0];
  }

  function friendRoute(pathName: string): boolean {
    const paths = pathName.split('/');
    return paths[1].includes('friends');
  }

  return userDisplay ? (
    <>
      { isShowNavBar && <NavBar /> }
      <div className="app-profile-container">
        <div className="app-profile">
          <div className="profile-header">
            <div className="profile-images">
              <div className="images-conatiner">
                <img src="" alt="" />
              </div>
              <div className="images-upload-button">Thêm ảnh bìa</div>
              <div className="images-avatar">
                <div className="avatar-container">
                  <div className="avatar" style={{backgroundColor: userDisplay.background_color}}>
                    {
                      userDisplay.avatar 
                      ? <img src={serverUrl + userDisplay.avatar} alt="" />
                      : <span className="avatar-character">{getFirstCharacter(userDisplay.first_name)}</span>
                    }
                  </div>
                  <div className="avatar-upload-button" onClick={handleModal}>
                    <AiFillCamera />
                  </div>
                  { openModal && <PopupUploadAvatar open={openModal} onChange={onChangeModal} /> }
                </div>
              </div>
            </div>
            <div className="profile-name">{getFullName(userDisplay.first_name, userDisplay.last_name)}</div>
            <div className="profile-navigate">
              <ul className="navigate-landing">
                <li className="landing-item">
                  {
                    friendRoute(location.pathname) 
                    ? <NavLink to={`/friends/${userDisplay.user_name}/posts`} state={{ user: userDisplay }} className="item-icon">
                      <span>Bài viết</span>
                    </NavLink>
                    : <NavLink to={`/${userDisplay.user_name}/posts`} state={{ user: userDisplay }} className="item-icon">
                      <span>Bài viết</span>
                    </NavLink>
                  }
                  
                </li>
                <li className="landing-item">
                  {
                    friendRoute(location.pathname) 
                    ? <NavLink to={`/friends/${userDisplay.user_name}/friends`} state={{ user: userDisplay }} className="item-icon">
                      <span>Bạn bè</span>
                    </NavLink>
                    : <NavLink to={`/${userDisplay.user_name}/friends`} state={{ user: userDisplay }} className="item-icon">
                      <span>Bạn bè</span>
                    </NavLink>
                  }
                  
                </li>
                <li className="landing-item">
                  { 
                    friendRoute(location.pathname) 
                    ? <NavLink to={`/friends/${userDisplay.user_name}/photos`} state={{ user: userDisplay }} className="item-icon">
                      <span>Ảnh</span>
                    </NavLink>
                    : <NavLink to={`/${userDisplay.user_name}/photos`} state={{ user: userDisplay }} className="item-icon">
                      <span>Ảnh</span>
                    </NavLink>
                  }
                  
                </li>
                <li className="landing-item">
                  <a href="/" className="item-icon"><span>Xem thêm</span></a>
                </li>
              </ul>
              <div className="landing-actions">
                <button className="landing-button button-friend">Bạn bè</button>
                <button className="landing-button button-message">Nhắn tin</button>
              </div>
            </div>
          </div>
          <div className="profile-container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : <></>;
}

export default Profile;
