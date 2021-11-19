

import CreatePost from 'components/create-post/create-post';
import Post from 'components/post/post';
import './home-middle.scss';

function HomeMiddle() {
  return (
    <div className="home-middle-container">
      <div className="home-middle">
        <CreatePost />
        <Post />
        <Post />
      </div>  
    </div>
  );
}

export default HomeMiddle;
