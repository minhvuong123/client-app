

import './create-comment.scss';

function CreateComment() {
  return (
    <div className="create-comment-container">
      <div className="create-comment">
        <div className="comment-icon">
          <span className="online"></span>
        </div>
        <div className="comment-create">
          <div contentEditable="true" placeholder="Viết bình luận..." className="comment-editable"></div>
          <div className="comment-extension">
            <span className="comment-extension-item">emo</span>
            <span className="comment-extension-item">att</span>
            <span className="comment-extension-item">gif</span>
            <span className="comment-extension-item">bra</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateComment;
