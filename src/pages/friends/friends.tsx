
import NavBar from 'navbar/nav-bar';
import FriendsList from './friends-list/friends-list';
import FriendsReview from './friends-review/friends-review';
import './friends.scss';

function Friends() {
  return (
    <>
      <NavBar />
      <div className="app-friends">
        <div className="app-friends-list">
          <div className="app-friends-list-container">
            <FriendsList />
          </div>
        </div>
        <div className="app-friends-review">
          <FriendsReview />
        </div>
      </div>
    </>
  );
}

export default Friends;
