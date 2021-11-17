
import './post-comment.scss';

function PostComment() {
  return (
    <div className="comment-container">
      <div className="comment">
        <div className="comment-block">
          <span className="comment-user"></span>
          <div className="comment-content">
            <div className="comment-text">
              <span className="comment-name">Chấn Hưng</span>
              <span className="comment-message">Nó cố tình để không bị chặn đấy!</span>
              <div className="comment-emotion">1</div>
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

export default PostComment;
