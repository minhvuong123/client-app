import htmlParse from 'html-react-parser';
import { IEmoji } from 'model';
import { ICommentResponse } from 'model/comment.model';
import { memo, useEffect, useState } from 'react';
import PostComments from './post-comments/post-comments';

import './post.scss';

function Post({ post }: any) {
  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState([] as ICommentResponse[]);

  useEffect(() => {
    setComments(post.post_comments)
  }, [post])

  function handleChangeComment(): void {
    setComment(!comment);
  }

  function handleCertainChangeComment(): void {
    setComment(true);
  }

  function handleComment(comment: ICommentResponse): void {
    setComments([...comments, comment]);
  }

  function getFullName(first_name: string = '', last_name: string = ''): string { 
    return `${first_name} ${last_name}`;
  }

  function isComment(comments: ICommentResponse[]) {
    return comments.length > 0;
  }

  function getTotalComment(comments: ICommentResponse[]) {
    return comments.length;
  }

  function isEmoji(emojis: IEmoji[]) {
    return emojis.length > 0;
  }

  function getTotalEmoji(emojis: IEmoji[]) {
    return emojis.length;
  }

  return (
    <div className="post-container">
      <div className="post">
        <div className="post-header">
          <div className="post-user">
            <span className="user-icon"></span>
            <div className="user-text">
              <span className="text-name">{ getFullName(post.post_user.first_name, post.post_user.last_name) }</span>
              <span className="text-time">1 giờ</span>
            </div>
          </div>
          <div className="post-close">X</div>
        </div>
        <div className="post-content">
          { 
            htmlParse(post.post_text)
          }
          {/* <div>Bán em này!</div>
          <div>4tr2, có thể thương lượng với những ai có thiện chí!</div>
          <div>Có giấy tờ!</div>
          <div>🥰🥰🥰🥰🥰🥰🥰🥰</div>
          <div className="post-images">
            <img src={banXe} alt="" />
          </div> */}
        </div>
        <div className="post-emotion-container">
          <div className="post-emotion">
          { 
            isEmoji(post.post_emojis) && 
            <span className="post-emotion-number">{ getTotalEmoji(post.post_emojis) }</span> 
          }
          </div>
          {
            isComment(comments) &&
            <div className="post-comment-number" onClick={handleChangeComment}>{ getTotalComment(comments) } bình luận</div> 
          }
        </div>
        <div className="post-comments">
          <div className="post-actions">
            <div className="action">Thích</div>
            <div className="action" onClick={handleCertainChangeComment}>Bình luận</div>
          </div>
          {
            comment
            && 
            <div className="post-comments-container">
              <PostComments post_id={post._id} post_comments={comments} onComment={handleComment} />  
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default memo(Post);
