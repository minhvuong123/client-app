
import NavBar from 'navbar/nav-bar';
import { useLocation } from 'react-router';
import FriendsList from './friends-list/friends-list';
import FriendsReview from './friends-review/friends-review';
import './friends.scss';

function Friends() {
  const location = useLocation();

  function friendReview(pathName: string): boolean {
    const paths = pathName.split('/');
    return paths[1].includes('friends') && Boolean(paths[2]);
  }
  
  return (
    <>
      <NavBar />
      <div className="app-friends">
        <div className="app-friends-list">
          <div className="app-friends-list-container">
            <FriendsList />
          </div>
        </div>
        {
          friendReview(location.pathname) &&
          <div className="app-friends-review">
            <FriendsReview />
          </div> 
        }

      </div>
    </>
  );
}

export default Friends;
