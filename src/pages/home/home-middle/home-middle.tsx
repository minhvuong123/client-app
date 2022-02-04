

import { getPostsUrl, postApi } from 'api';
import CreatePost from 'components/create-post/create-post';
import { IPostResponse } from 'model';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Post from 'components/post/post';

import './home-middle.scss';

function HomeMiddle() {
  const [posts, setPosts] = useState([] as IPostResponse[]);
  const location = useLocation() as any;
  console.log("location: ", location)

  useEffect(() => {
    async function getPosts() {
      const responsePost = await postApi.gettingPosts(`${getPostsUrl}/user_id/${undefined}/page/${0}/limit/${10}`);
      const { status, data } = responsePost;
      const posts: IPostResponse[] = data.posts;

      if(status === 200 && posts) {
        setPosts(posts);
      }
    }

    getPosts();
  }, [])

  return (
    <div className="home-middle-container">
      <div className="home-middle">
        <CreatePost />
        <div className="post-list">
          {
            posts.map((post: IPostResponse) => {
              return <Post key={post._id} post={post} />
            })
          }
        </div>
      </div>  
    </div>
  );
}

export default HomeMiddle;
