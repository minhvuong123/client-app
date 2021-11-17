import './popup-notify.scss';

function PopupNotify() {
  return (
    <div className="notify-popup">
      <div className="popup-top">
        <h3 className="popup-header">Thông báo</h3>
        <div className="popup-extension">
          <span className="extension-all">Tất cả</span>
          <span className="extension-not-read">Chưa đọc</span>
        </div>
      </div>
      <div className="popup-content">
        <div className="new-notify">
          <div className="notify-header">
            <h3 className="header-text">Mới</h3>
            <div className="header-dot">
              Xem tất cả
            </div>
          </div>
          <div className="notify-list">
            <div className="notify-item">
              <span className="notify-item-icon"></span>
              <div className="notify-item-content">
                <div className="text">
                  <span className="text-bold">Võ Lâm Truyền Kỳ </span>
                  đã đăng trong
                  <span className="text-bold"> You Programmer - SmartBro</span>
                </div>
                <span className="hours">27 phút trước</span>
              </div>
            </div>
            
            <div className="notify-item">
              <span className="notify-item-icon"></span>
              <div className="notify-item-content">
                <div className="text">
                  <span className="text-bold">Võ Lâm Truyền Kỳ </span>
                  đã đăng trong
                  <span className="text-bold"> You Programmer - SmartBro</span>
                </div>
                <span className="hours">27 phút trước</span>
              </div>
            </div>
          </div>
        </div>
        <div className="old-notify">
          <div className="notify-header">
            <h3 className="header-text">Trước đó</h3>
            <div className="header-dot">
              Xem tất cả
            </div>
          </div>
          <div className="notify-list">
            <div className="notify-item">
              <span className="notify-item-icon"></span>
              <div className="notify-item-content">
                <div className="text">
                  <span className="text-bold">Võ Lâm Truyền Kỳ </span>
                  đã đăng trong
                  <span className="text-bold"> You Programmer - SmartBro</span>
                </div>
                <span className="hours">27 phút trước</span>
              </div>
            </div>

            <div className="notify-item">
              <span className="notify-item-icon"></span>
              <div className="notify-item-content">
                <div className="text">
                  <span className="text-bold">Võ Lâm Truyền Kỳ </span>
                  đã đăng trong
                  <span className="text-bold"> You Programmer - SmartBro</span>
                </div>
                <span className="hours">27 phút trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupNotify;
