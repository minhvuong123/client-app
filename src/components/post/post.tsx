import { addingPostEmojiUrl, postApi, removePostEmojiUrl, removePostUrl, serverUrl, updatePostEmojiUrl } from 'api';
import { emojiKey, iconsEmoji } from 'const';
import htmlParse from 'html-react-parser';
import { IEmoji, IEmojiAfterMapping, IImage } from 'model';
import { ICommentResponse } from 'model/comment.model';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';
import PostComments from './post-comments/post-comments';

import './post.scss';

function Post({ post, onRemovePost }: any) {
  const user = useSelector(SelectorAccessUser);
  const [comment, setComment] = useState(false);
  const [comments, setComments] = useState([] as ICommentResponse[]);
  const [emojis, setEmojis] = useState([] as IEmoji[]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setComments(post.post_comments)
  }, [post.post_comments])

  const handleLiked = useCallback((emojis: IEmoji[]) => {
    const emoji = emojis.find(emoji => emoji.emoji_user._id === user._id);
    return emoji ? true : false
  }, [user._id])

  useEffect(() => {
    if(handleLiked(post.post_emojis)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }

    setEmojis(post.post_emojis);
  }, [post.post_emojis, handleLiked])

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

  function getEmojiUrl(emoji_type: string): string {
    const emojiUrl = iconsEmoji.find(emoji => emoji.id === emoji_type);

    return emojiUrl && emojiUrl.iconUrl ? emojiUrl.iconUrl : '';
  }

  function handleChangeComment(): void {
    setComment(!comment);
  }

  function handleCertainChangeComment(): void {
    setComment(true);
  }

  function handleComment(comment: ICommentResponse): void {
    setComments([...comments, comment]);
  }

  async function handleEmoji(emoji_type: string) {
    if(!isLiked) { // add emoji
      const originEmojiData = {
        _id: post._id,
        emoji_user: user,
        emoji_type: emoji_type
      }
      const responseEmoji = await postApi.addingPostEmoji(addingPostEmojiUrl, originEmojiData);
      const { status, data } = responseEmoji;
  
      if(status === 200 && data.emoji) {
        setEmojis([...emojis, data.emoji]);
        setIsLiked(true);
      }
    } else {
      const emojiUser = emojis.find((emoji: IEmoji) => emoji.emoji_user._id === user._id);

      if(emojiUser && emojiUser.emoji_type !== emoji_type) { // update emoji_type
        const originEmojiData = {
          _id: post._id, 
          emoji_id: emojiUser._id,
          emoji_type: emoji_type
        }

        const responseEmoji = await postApi.updatePostEmoji(updatePostEmojiUrl, originEmojiData);
        const { status, data } = responseEmoji;

        if(status === 200 && data.message === 'updated') {
          emojiUser.emoji_type = emoji_type;

          setEmojis([...emojis]);
        }
      } else { // remove emoji
        const originEmojiData = {
          _id: post._id, 
          user_id: user._id
        }
        const responseEmoji = await postApi.removePostEmoji(removePostEmojiUrl, originEmojiData);
        const { status, data } = responseEmoji;
    
        if(status === 200 && data.message === 'updated') {
          const emojiTemp = emojis.filter((emoji: IEmoji) => emoji.emoji_user._id !== user._id);
          
          setEmojis(emojiTemp);
          setIsLiked(false);
        }
      }
    }
  }

  function getFullName(first_name: string = '', last_name: string = ''): string { 
    return `${first_name} ${last_name}`;
  }

  function isComment(comments: ICommentResponse[]) {
    return comments.length > 0;
  }

  function calculateTotalComment(totalResult: { total: number }, comments: ICommentResponse[]) {
    comments.forEach(comment => {
      totalResult.total = totalResult.total + 1;
      if(comment.comments.length > 0) {
        calculateTotalComment(totalResult, comment.comments)
      }
    })
  }

  function getTotalComment(comments: ICommentResponse[]) {
    const totalResult = { total: 0 };
    calculateTotalComment(totalResult, comments);
 
    return totalResult.total;
  }

  function isEmoji(emojis: IEmoji[]) {
    return emojis.length > 0;
  }

  function getTotalEmoji(emojis: IEmoji[]) {
    return emojis.length;
  }

  async function handleRemovePost(postId: string) {
    const originPostData = { _id: postId }
    const responsePost = await postApi.removePost(removePostUrl, originPostData)
    const { status, data } = responsePost;

    if(status === 200 && data.status === 'removed') {
      onRemovePost(postId)
    }
  }

  function getClassNameImageItem(fileLength: number, index: number) {
    if (fileLength <= 2) {
      return 'w-100';
    } else if (fileLength === 3) {
      if(index === 0) return 'w-100';
      return 'w-50'
    } else {
      if(index === 0) return 'w-100';
      if(index === 1 || index === 2 || index === 3 ) return 'w-33'
    }
  }

  function handleChooseImage(image: IImage) {
    console.log("image: ", image);
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
          <div className="post-close" onClick={() => handleRemovePost(post._id)}>X</div>
        </div>
        <div className="post-content">
          { htmlParse(post.post_text) }
          {
            post.post_images.length > 0
            && 
            <div className="images-list flex-row">
              {
                post.post_images.map((image: IImage, index: number) => {
                  if(index <= 2) {
                    return  (
                      <div 
                        key={image._id} 
                        className={`image-item ${getClassNameImageItem(post.post_images.length, index)}`}
                        onClick={() => handleChooseImage(image)}
                      >
                        <img src={serverUrl + image.images_url} alt={image._id} />
                      </div>
                    ) 
                  } else if(index === 3) {
                    return (
                      <div key={image._id} className={`image-item ${getClassNameImageItem(post.post_images.length, index)}`}>
                        <img src={serverUrl + image.images_url} alt={image._id} />
                        {
                          post.post_images.length > 4 
                          && 
                          <span className="image-item-total">+{ post.post_images.length - 4 }</span>
                        }
                      </div>
                    )
                  }
                })
              }
            </div>
          }
        </div>
        <div className="post-emotion-container">
          <div className="post-emotion">
            <div className="post-emoji-container">
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
            { 
              isEmoji(emojis) && 
              <span className="post-emotion-number">{ getTotalEmoji(emojis) }</span> 
            }
          </div>
          {
            isComment(comments) &&
            <div className="post-comment-number" onClick={handleChangeComment}>{ getTotalComment(comments) } bình luận</div> 
          }
        </div>
        <div className="post-comments">
          <div className="post-actions">
            <div className={`action-item ${isLiked ? "liked" : ""}`}>
              <span onClick={() => handleEmoji(emojiKey.like)}>Thích</span>
              <div className="emojis-container">
              {
                iconsEmoji.map(emoji => {
                  return ( 
                    <span key={emoji.id} className="emoji-item" onClick={() => handleEmoji(emoji.id)}>
                      <img src={emoji.iconUrl} alt={emoji.id} />
                    </span>
                  )
                })
              }
              </div>
            </div>
            <div className="action-item" onClick={handleCertainChangeComment}>Bình luận</div>
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
