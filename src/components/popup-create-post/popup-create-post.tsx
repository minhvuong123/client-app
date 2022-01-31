import ReactDOM from 'react-dom';
import './popup-create-post.scss';

function PopupCreatePost({ open, onChange }: any) {

  function handeCloseModal() {
    onChange(false)
  }

  function handleChange(event: any) {
    console.log(event.target.innerHTML);
  }
  
  return open ? ReactDOM.createPortal(
    <div className="popup-create-post-container">
      <div className="popup-blur" onClick={handeCloseModal}></div>
      <div className="popup-create-post">
        <div className="popup-header">
            <span className="header-title">Tạo bài viết</span>
            <span className="header-close" onClick={handeCloseModal}>X</span>
        </div>
        <div className="popup-content">
          <div className="popup-user">
            <div className="user-icon"></div>
            <div className="user-info">
              <span className="user-name">Vương Nguyễn</span>
              <span className="user-shared">Chỉ mình tôi</span>
            </div>
          </div>
          <div className="content-control">
            <div className="typing-container">
              <div contentEditable={true} onInput={handleChange} className="typing-text" placeholder="Bạn đang nghĩ gì thế?"></div>
            </div>
            <div className="control-actions">
              <span className="control-item">attach</span>
            </div>
            <div className="control-post">Đăng</div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('root-modal') as HTMLElement
  ) : <></>;
}

export default PopupCreatePost;
