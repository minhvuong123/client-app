

import { getPostsUrl, postApi } from 'api/post.api';
import CreatePost from 'components/create-post/create-post';
import Post from 'components/post/post';
import { IPostResponse } from 'model';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './profile-home.scss';

function ProfileHome() {
  const [posts, setPosts] = useState([] as IPostResponse[]);
  const location = useLocation();

  useEffect(() => {
    async function getPosts() {
      const id = location.state.user._id;
      const responsePost = await postApi.gettingPosts(`${getPostsUrl}/user_id/${id}/page/${0}/limit/${10}`);
      const { status, data } = responsePost;
      const posts: IPostResponse[] = data.posts;

      if(status === 200 && posts) {
        setPosts(posts);
      }
    }

    if(location.state && location.state.user) {
      getPosts();
    }
  }, [location.state])

  function friendRoute(pathName: string): boolean {
    const paths = pathName.split('/');
    return paths[1].includes('friends');
  }

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
        { !friendRoute(location.pathname) && <CreatePost /> }
        <div className="post-list">
          {
            posts.map((post: IPostResponse) => {
              return <Post key={post._id} post={post} />
            })
          }
        </div>
      </div>
    </>
  );
}

export default ProfileHome;
