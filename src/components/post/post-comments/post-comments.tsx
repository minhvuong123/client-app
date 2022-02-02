
import CreateComment from 'components/create-comment/create-comment';
import PostComment from 'components/post/post-comment/post-comment';
import { ICommentResponse } from 'model/comment.model';

import './post-comments.scss';

function PostComments({ post_id, post_comments, onComment }: any) {

  function handleComment(comment: ICommentResponse) {
    onComment(comment);
  }

  return (
    <div className="comments-container">
      <div className="comments">
        {
          post_comments.map((comment: ICommentResponse) => <PostComment key={comment._id} comment={comment} />)
        }
        {/* pass post_id and comment_id to distinguish comment of post or comment of this one */}
        <CreateComment postId={post_id} commentId={null} onComment={handleComment} />
      </div>
    </div>
  );
}

export default PostComments;
