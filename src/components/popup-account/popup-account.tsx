import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { SelectorIsLogin } from 'redux/reducers/authentication.reducer';
import './popup-account.scss';

function PopupAccount() {
  const dispatch = useDispatch();
  const isLogin = useSelector(SelectorIsLogin);
  const navigate = useNavigate();


  useEffect(() => {
    if(!isLogin) {
      navigate('/')
    }
  }, [isLogin])
  
  function logout(): void {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div className="account-popup">
      <div className="account-block">
        <span className="block-icon"></span>
        <div className="block-info">
          <span className="info-name">Nguyễn Võ Minh Vương</span>
          <span className="info-text">Xem trang cá nhân của bạn</span>
        </div>
      </div>
      <div className="block-line"></div>
      <div className="nav-setting">
        <div className="setting-item">
          <span className="setting-item-icon"></span>
          <span className="setting-item-text">Cài đặt & quyền riêng tư</span>
        </div>
        <div className="setting-item">
          <span className="setting-item-icon"></span>
          <span className="setting-item-text" onClick={logout}>Đăng xuất</span>
        </div>
      </div>
    </div>
  );
}

export default PopupAccount;
