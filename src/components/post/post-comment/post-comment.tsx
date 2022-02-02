
import { IEmoji, UserResponse } from 'model';
import htmlParse from 'html-react-parser';
import { memo } from 'react';
import './post-comment.scss';

function PostComment({ comment }: any) {

  function getFullName(user: UserResponse): string { 
    return `${user.first_name} ${user.last_name}`;
  }

  function isEmoji(emojis: IEmoji[]) {
    return emojis.length > 0;
  }

  function getTotalEmoji(emojis: IEmoji[]) {
    return emojis.length;
  }

  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-block">
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
              <a href="/" className="extension response">Phản hồi</a>
              <span className="extension hours">6 giờ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PostComment);
