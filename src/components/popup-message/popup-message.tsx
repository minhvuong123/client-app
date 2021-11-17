import { NavLink } from 'react-router-dom';
import './popup-message.scss';

function PopupMessage() {
  return (
    <div className="message-popup">
      <div className="popup-content">
        <div className="popup-top">
          <h3 className="popup-header">Messenger</h3>
          <div className="popup-extension">
          </div>
        </div>
        <div className="message-list">
          <div className="message-item">
            <span className="message-item-icon"></span>
            <div className="message-item-content">
              <div className="text-name">Đinh Thị Chang</div>
              <div className="text-message">
                <span className="message-last">
                  Chang sent a sticker
                </span>
                <span className="hours">27 phút trước</span>
              </div>
            </div>
          </div>
          <div className="message-item">
            <span className="message-item-icon"></span>
            <div className="message-item-content">
              <div className="text-name">Đinh Thị Chang</div>
              <div className="text-message">
                <span className="message-last">@@</span>
                <span className="hours">27 phút trước</span>
              </div>
            </div>
          </div>
          <div className="message-item">
            <span className="message-item-icon"></span>
            <div className="message-item-content">
              <div className="text-name">Đinh Thị Chang</div>
              <div className="text-message">
                <span className="message-last">@@</span>
                <span className="hours">27 phút trước</span>
              </div>
            </div>
          </div>
          <div className="message-item">
            <span className="message-item-icon"></span>
            <div className="message-item-content">
              <div className="text-name">Đinh Thị Chang</div>
              <div className="text-message">
                <span className="message-last">@@</span>
                <span className="hours">27 phút trước</span>
              </div>
            </div>
          </div>
          <div className="message-item">
            <span className="message-item-icon"></span>
            <div className="message-item-content">
              <div className="text-name">Đinh Thị Chang</div>
              <div className="text-message">
                <span className="message-last">@@</span>
                <span className="hours">27 phút trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="message-bottom">
        <NavLink to="/messengers">Xem tất cả trong Messenger</NavLink>
      </div>
    </div>
  );
}

export default PopupMessage;
