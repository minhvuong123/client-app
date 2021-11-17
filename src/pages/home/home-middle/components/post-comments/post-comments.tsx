
import CreateComment from '../create-comment/create-comment';
import PostComment from '../post-comment/post-comment';
import './post-comments.scss';

function PostComments() {
  return (
    <div className="comments-container">
      <div className="comments">
        <PostComment />
        <CreateComment />
      </div>
    </div>
  );
}

export default PostComments;
