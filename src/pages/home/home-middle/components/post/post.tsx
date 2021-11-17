
import banXe from 'images/ban_xe.jpg';
import PostComment from '../post-comments/post-comments';
import './post.scss';

function Post() {
  return (
    <div className="post-container">
      <div className="post">
        <div className="post-header">
          <div className="post-user">
            <span className="user-icon"></span>
            <div className="user-text">
              <span className="text-name">Nguyễn Võ Minh Vương</span>
              <span className="text-time">1 giờ</span>
            </div>
          </div>
          <div className="post-extension">...</div>
        </div>
        <div className="post-content">
          <div>Bán em này!</div>
          <div>4tr2, có thể thương lượng với những ai có thiện chí!</div>
          <div>Có giấy tờ!</div>
          <div>🥰🥰🥰🥰🥰🥰🥰🥰</div>
          <div className="post-images">
            <img src={banXe} alt="" />
          </div>
        </div>
        <div className="post-emotion-container">
          <div className="post-emotion">
            🥰🥰 <span className="post-emotion-number">26</span>
          </div>
          <div className="post-comment-number">26 bình luận</div>
        </div>
        <div className="post-comments">
          <div className="post-actions">
            <div className="action">Thích</div>
            <div className="action">Bình luận</div>
            <div className="action">Chia sẻ</div>
          </div>
          <div className="comments">
            <PostComment />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
