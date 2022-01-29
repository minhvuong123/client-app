

import Post from 'components/post/post';
import './profile-home.scss';

function ProfileHome() {
  return (
    <>
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
            <div className="friends-item friends-item-fix"></div>
            <div className="friends-item friends-item-fix"></div>
            <div className="friends-item friends-item-fix"></div>
            <div className="friends-item friends-item-fix"></div>
          </div>
        </div>
      </div>
      <div className="profile-body-right">
        <div className="post-list">
          <Post />
          <Post />
        </div>
      </div>
    </>
  );
}

export default ProfileHome;
