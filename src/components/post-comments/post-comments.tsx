
import CreateComment from 'components/create-comment/create-comment';
import PostComment from 'components/post-comment/post-comment';
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
