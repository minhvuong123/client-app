
import { addingPostCommentUrl, postApi } from 'api/post.api';
import { ICommentRequest } from 'model';
import { useSelector } from 'react-redux';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';

import './create-comment.scss';

function CreateComment({ postId, commentId, onComment }: any) {
  const user = useSelector(SelectorAccessUser);

  async function handleKeyEnter(event: HTMLDivElement | any): Promise<void>  {
    if (event.key === 'Enter' && !event.shiftKey) {
      // send comment to post's api
      const originCommentData: ICommentRequest = {
        _id: '',
        comment_user: user,
        comment_text: event.target.innerHTML,
      }

      if(postId) {
        originCommentData._id = postId;
        const responsePost = await postApi.addingPostComment(addingPostCommentUrl, originCommentData)
        const { status, data } = responsePost;

        if(status === 200 && data.message === 'updated' && data.comment) {
          onComment && onComment(data.comment);
          event.target.innerHTML = '';
        }
      } else if(commentId) { // send comment to comment's api

      }
    }
  }

  return (
    <div className="create-comment-container">
      <div className="create-comment">
        <div className="comment-icon">
          <span className="online"></span>
        </div>
        <div className="comment-create">
          <div 
            contentEditable="true" 
            placeholder="Viết bình luận..." 
            className="comment-editable"
            onKeyDown={handleKeyEnter}
          ></div>
          <div className="comment-extension">
            <span className="comment-extension-item">attach</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateComment;
