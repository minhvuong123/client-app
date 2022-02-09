

import { getPostsUrl, postApi } from 'api/post.api';
import CreatePost from 'components/create-post/create-post';
import Post from 'components/post/post';
import { IPostResponse } from 'model';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ProfileFriends from '../profile-friends/profile-friends';
import ProfilePhotos from '../profile-photos/profile-photos';

import './profile-home.scss';

function ProfileHome() {
  const [posts, setPosts] = useState([] as IPostResponse[]);
  const location = useLocation() as any;

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

  function handlePost(post: IPostResponse): void {
    setPosts([...posts, post]);
  }

  function hanelRemovePost(postId: string) {
    const postsTemp = posts.filter(post => post._id !== postId)

    setPosts([...postsTemp]);
  }

  return (
    <>
      <div className="profile-body-left">
        <ProfilePhotos itemTotal={3} classContainer="profile-route" />
        <ProfileFriends itemTotal={3} classContainer="profile-route" />
      </div>
      <div className="profile-body-right">
        { !friendRoute(location.pathname) && <CreatePost onPost={handlePost} /> }
        <div className="post-list">
          {
            posts.length > 0
            ? posts.map((post: IPostResponse) => {
              return <Post key={post._id} post={post} onRemovePost={hanelRemovePost} />
            })
            : <div className="post-empty">Không có bài đăng</div>
          }
        </div>
      </div>
    </>
  );
}

export default ProfileHome;
