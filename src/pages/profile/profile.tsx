


import Post from 'components/post/post';
import { NavLink } from 'react-router-dom';
import './profile.scss';

function Profile() {
  return (
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
                <div className="avatar"></div>
                <div className="avatar-upload-button"></div>
              </div>
            </div>
          </div>
          <div className="profile-name">Vương Nguyễn</div>
          <div className="profile-navigate">
            <ul className="navigate-landing">
              <li className="landing-item">
                <NavLink to="/" className="item-icon"><span>Bài viết</span></NavLink>
              </li>
              <li className="landing-item">
                <NavLink to="/friends" className="item-icon"><span>Bạn bè</span></NavLink>
              </li>
              <li className="landing-item">
                <NavLink to="/watch" className="item-icon"><span>Ảnh</span></NavLink>
              </li>
              <li className="landing-item">
                <a href="/" className="item-icon"><span>Xem thêm</span></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="profile-container">
          <div className="profile-body-left">
            <div className="profile-images-conatiner">
              <div className="images-header">Ảnh</div>
            </div>
            <div className="profile-friends-conatiner">
              <div className="friends-header">Bạn bè</div>
              <div className="friends-amount">45 người bạn</div>
              <div className="friends-list">
                <div className="friends-item">
                  <span className="item-image"></span>
                  <span className="item-name">Name</span>
                </div>
                <div className="friends-item">
                  <span className="item-image"></span>
                  <span className="item-name">Name</span>
                </div>
                <div className="friends-item">
                  <span className="item-image"></span>
                  <span className="item-name">Name</span>
                </div>
                <div className="friends-item">
                  <span className="item-image"></span>
                  <span className="item-name">Name</span>
                </div>
                <div className="friends-item">
                  <span className="item-image"></span>
                  <span className="item-name">Name</span>
                </div>
                <div className="friends-item">
                  <span className="item-image"></span>
                  <span className="item-name">Name</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-body-right">
            <div className="post-list">
              <Post />
              <Post />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
