


import NavBar from 'navbar/nav-bar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';
import { useLocation } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import './profile.scss';

function Profile({ isShowNavBar }: any) {
  const user = useSelector(SelectorAccessUser);
  const location = useLocation();

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

  return user && (
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
                  <div className="avatar" style={{backgroundColor: user.background_color}}>
                    {
                      user.avatar 
                      ? <img src={user.avatar} alt="" />
                      : <span className="avatar-character">{getFirstCharacter(user.first_name)}</span>
                    }
                  </div>
                  <div className="avatar-upload-button"></div>
                </div>
              </div>
            </div>
            <div className="profile-name">{getFullName(user.first_name, user.last_name)}</div>
            <div className="profile-navigate">
              <ul className="navigate-landing">
                <li className="landing-item">
                  {
                    friendRoute(location.pathname) 
                    ? <NavLink to={`/friends/${user.user_name}/posts`} className="item-icon"><span>Bài viết</span></NavLink>
                    : <NavLink to={`/${user.user_name}/posts`} className="item-icon"><span>Bài viết</span></NavLink>
                  }
                  
                </li>
                <li className="landing-item">
                  {
                    friendRoute(location.pathname) 
                    ? <NavLink to={`/friends/${user.user_name}/friends`} className="item-icon"><span>Bạn bè</span></NavLink>
                    : <NavLink to={`/${user.user_name}/friends`} className="item-icon"><span>Bạn bè</span></NavLink>
                  }
                  
                </li>
                <li className="landing-item">
                  { 
                    friendRoute(location.pathname) 
                    ? <NavLink to={`/friends/${user.user_name}/photos`} className="item-icon"><span>Ảnh</span></NavLink>
                    : <NavLink to={`/${user.user_name}/photos`} className="item-icon"><span>Ảnh</span></NavLink>
                  }
                  
                </li>
                <li className="landing-item">
                  <a href="/" className="item-icon"><span>Xem thêm</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="profile-container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
