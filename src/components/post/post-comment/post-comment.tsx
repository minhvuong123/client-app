
import CreateComment from 'components/create-comment/create-comment';
import { ICommentResponse, IEmoji, IEmojiAfterMapping, UserResponse } from 'model';
import htmlParse from 'html-react-parser';
import { memo, useEffect, useState } from 'react';
import { emojiKey, iconsEmoji } from 'const';
import { useSelector } from 'react-redux';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';
import { addingCommentEmojiUrl, commentApi, removeCommentEmojiUrl, updateCommentEmojiUrl } from 'api';
import './post-comment.scss';


function PostComment({ comment, isFinal, isNotFinal }: any) {
  const user = useSelector(SelectorAccessUser);
  const [isComment, setIsComment] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [comments, setComments] = useState([] as ICommentResponse[]);
  const [emojis, setEmojis] = useState([] as IEmoji[]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setComments(comment.comments);
  }, [comment])

  useEffect(() => {
    if(handleLiked(comment.comment_emojis)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }

    setEmojis(comment.comment_emojis);
  }, [comment.comment_emojis])

  function handleChangeComment(event: any): void {
    event.preventDefault();
    
    setIsComment(!isComment);
  }

  function handleComment(comment: ICommentResponse) {
    setComments([...comments, comment]);
    setIsNew(true)
  }

  function handleLiked(emojis: IEmoji[]): boolean {
    const emoji = emojis.find(emoji => emoji.emoji_user._id === user._id);

    return emoji ? true : false
  }

  async function handleEmoji(event: any, emoji_type: string) {
    event.preventDefault();

    if(!isLiked) { // add emoji
      const originEmojiData = {
        _id: comment._id,
        emoji_user: user,
        emoji_type: emoji_type
      }
      const responseEmoji = await commentApi.addingCommentEmoji(addingCommentEmojiUrl, originEmojiData);
      const { status, data } = responseEmoji;
  
      if(status === 200 && data.emoji) {
        setEmojis([...emojis, data.emoji]);
        setIsLiked(true);
      }
    } else { 
      const emojiUser = emojis.find((emoji: IEmoji) => emoji.emoji_user._id === user._id);

      if(emojiUser && emojiUser.emoji_type !== emoji_type) { // update emoji_type
        const originEmojiData = {
          _id: comment._id, 
          emoji_id: emojiUser._id,
          emoji_type: emoji_type
        }

        const responseEmoji = await commentApi.updateCommentEmoji(updateCommentEmojiUrl, originEmojiData);
        const { status, data } = responseEmoji;

        if(status === 200 && data.message === 'updated') {
          emojiUser.emoji_type = emoji_type;

          setEmojis([...emojis]);
        }
      } else { // remove emoji
        const originEmojiData = {
          _id: comment._id, 
          user_id: user._id
        }
        const responseEmoji = await commentApi.removeCommentEmoji(removeCommentEmojiUrl, originEmojiData);
        const { status, data } = responseEmoji;
    
        if(status === 200 && data.message === 'updated') {
          const emojiTemp = emojis.filter((emoji: IEmoji) => emoji.emoji_user._id !== user._id);
          
          setEmojis(emojiTemp);
          setIsLiked(false);
        }
      }
    }
  }

  function mappingEmojis(emojis: IEmoji[]): IEmojiAfterMapping[]  {
    const emojiResult = [];
    const emojiLike: IEmojiAfterMapping = { emoji_type: 'like', emoji_users: [] };
    const emojiHeart: IEmojiAfterMapping = { emoji_type: 'heart', emoji_users: [] };
    const emojiCare: IEmojiAfterMapping = { emoji_type: 'care', emoji_users: [] };
    const emojiHaha: IEmojiAfterMapping = { emoji_type: 'haha', emoji_users: [] };
    const emojiWow: IEmojiAfterMapping = { emoji_type: 'wow', emoji_users: [] };
    const emojiSad: IEmojiAfterMapping = { emoji_type: 'sad', emoji_users: [] };
    const emojiAngry: IEmojiAfterMapping = { emoji_type: 'angry', emoji_users: [] };

    emojis.forEach((emoji: IEmoji) => {
      switch (emoji.emoji_type) {
        case emojiKey.like: emojiLike.emoji_users.push(emoji.emoji_user); break;
        case emojiKey.heart: emojiHeart.emoji_users.push(emoji.emoji_user); break;
        case emojiKey.care: emojiCare.emoji_users.push(emoji.emoji_user); break;
        case emojiKey.haha: emojiHaha.emoji_users.push(emoji.emoji_user); break;
        case emojiKey.wow: emojiWow.emoji_users.push(emoji.emoji_user); break;
        case emojiKey.sad: emojiSad.emoji_users.push(emoji.emoji_user); break;
        case emojiKey.angry: emojiAngry.emoji_users.push(emoji.emoji_user); break;
        default: break;
      }
    })
    
    if(emojiAngry.emoji_users.length > 0) {
      emojiResult.push(emojiAngry)
    }
    
    if(emojiSad.emoji_users.length > 0) {
      emojiResult.push(emojiSad)
    }
    
    if(emojiWow.emoji_users.length > 0) {
      emojiResult.push(emojiWow)
    }
    
    if(emojiHaha.emoji_users.length > 0) {
      emojiResult.push(emojiHaha)
    }
    
    if(emojiCare.emoji_users.length > 0) {
      emojiResult.push(emojiCare)
    }

    if(emojiHeart.emoji_users.length > 0) {
      emojiResult.push(emojiHeart)
    }

    if(emojiLike.emoji_users.length > 0) {
      emojiResult.push(emojiLike)
    }

    return emojiResult
  }

  function getPreviewEmoji(emojis: IEmoji[]) {
    const emojiResult = mappingEmojis(emojis);

    if(emojiResult.length > 1) {
      return emojiResult.map((emoji: IEmojiAfterMapping) => {
        return (
          <div key={emoji.emoji_type} className="emoji-preview-item">
            <img src={getEmojiUrl(emoji.emoji_type)} alt={emoji.emoji_type} className="emoji-preview-icon" />
            <span className="emoji-preview-total">{emoji.emoji_users.length}</span>
          </div>
        )
      })
    }

    return (
      <div className="emoji-preview-item-long">
        <div className="emoji-title">
          <img src={getEmojiUrl(emojiResult[0].emoji_type)} alt={emojiResult[0].emoji_type} className="emoji-preview-icon" />
          <span className="emoji-preview-total">{emojiResult[0].emoji_users.length}</span>
        </div>
        <div className="emoji-users">
          <span className="user-item">User 1</span>
          <span className="user-item">User 2 User 2 User 2</span>
          <span className="user-item">User 3</span>
          <span className="user-item">User 4</span>
          <span className="user-item">User 5</span>
        </div>
      </div>
    )
  }

  function getEmojiUrl(emoji_type: string): string {
    const emojiUrl = iconsEmoji.find(emoji => emoji.id === emoji_type);

    return emojiUrl && emojiUrl.iconUrl ? emojiUrl.iconUrl : '';
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
                isEmoji(emojis) &&
                <div className="comment-emotion-container">
                  <div className="comment-emotion">
                    <div className="emoji-container">
                      {
                          mappingEmojis(emojis).map((emoji: IEmojiAfterMapping) => {
                            return (
                              <span key={emoji.emoji_type} className="emoji-item">
                                <img src={getEmojiUrl(emoji.emoji_type)} alt={emoji.emoji_type} />
                              </span>
                            )
                          })
                      }
                    </div>
                    <span className="emoji-total">{ getTotalEmoji(emojis) }</span>
                    { 
                      emojis.length > 0 &&  
                      <div className="emoji-preview">
                        { getPreviewEmoji(emojis) }
                      </div>
                    }
                  </div>
                </div>
              } 
            </div>
            <div className="comment-extension">
              <a href="/" className="extension-item item-like" onClick={(event) => handleEmoji(event, "like")}>
                Thích
                <div className="emojis-container">
                {
                  iconsEmoji.map(emoji => {
                    return ( 
                      <span key={emoji.id} className="emoji-item" onClick={(event) => handleEmoji(event, emoji.id)}>
                        <img src={emoji.iconUrl} alt={emoji.id} />
                      </span>
                    )
                  })
                }
              </div>
              </a>
              <a href="/" className="extension-item item-response" onClick={handleChangeComment}>Phản hồi</a>
              <span className="extension-item item-hours">6 giờ</span>
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
