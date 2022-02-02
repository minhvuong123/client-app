
import CreateComment from 'components/create-comment/create-comment';
import { ICommentResponse, IEmoji, UserResponse } from 'model';
import htmlParse from 'html-react-parser';
import { memo, useEffect, useState } from 'react';

import './post-comment.scss';

function PostComment({ comment, isFinal, isNotFinal }: any) {
  const [isComment, setIsComment] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [comments, setComments] = useState([] as ICommentResponse[]);

  useEffect(() => {
    setComments(comment.comments);
  }, [comment])

  function handleChangeComment(event: any): void {
    event.preventDefault();
    
    setIsComment(!isComment);
  }

  function handleComment(comment: ICommentResponse) {
    setComments([...comments, comment]);
    setIsNew(true)
  }

  function getFullName(user: UserResponse): string { 
    return `${user.first_name} ${user.last_name}`;
  }

  function isEmoji(emojis: IEmoji[]) {
    return emojis.length > 0;
  }

  function getTotalEmoji(emojis: IEmoji[]) {
    return emojis.length;
  }

  function isFinalComment(comment: ICommentResponse): boolean {
    return comment.comments.length === 0
  }

  function isNotFinalComment(post_comments: ICommentResponse[], index: number): boolean {
    return post_comments.length > index + 1;
  }

  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-block">
          { (!isFinal || isNew) && <div className="comment-tree"></div> }
          { (!isFinal || isNew) && <div className="comment-tree-end"></div> }
          { isNotFinal && <div className="comment-tree-item"></div> }
          <span className="comment-user"></span>
          <div className="comment-content">
            <div className="comment-text">
              <span className="comment-name">{ getFullName(comment.comment_user) }</span>
              <div className="comment-message">
                { htmlParse(comment.comment_text) }
              </div>
              {
                isEmoji(comment.comment_emojis) &&
                <div className="comment-emotion">{ getTotalEmoji(comment.comment_emojis) }</div>
              } 
            </div>
            <div className="comment-extension">
              <a href="/" className="extension like">Thích</a>
              <a href="/" className="extension response" onClick={handleChangeComment}>Phản hồi</a>
              <span className="extension hours">6 giờ</span>
            </div>
            <div className="comment-reply">
            {
              comments.map((comment: ICommentResponse, index: number) => {
                return <PostComment 
                          key={comment._id} 
                          comment={comment} 
                          isFinal={isFinalComment(comment)} 
                          isNotFinal={isNotFinalComment(comments, index)}
                    />
              })
            }
            </div>
            {/* pass post_id and comment_id to distinguish comment of post or comment of this one */}
            <div className="comment-editable-container">
              {
                isComment && 
                <CreateComment postId={null} commentId={comment._id} onComment={handleComment} />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PostComment);
