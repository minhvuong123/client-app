import { useDispatch, useSelector } from 'react-redux';
import './signin.scss';

function SignIn() {
  const selectorAuth = useSelector((state: any) => state.authentication);
  const dispatch = useDispatch();
  console.log('selector:', selectorAuth);

  function login(event: any) {
    event.preventDefault();
    dispatch({ type: 'LOGIN' })

    // eslint-disable-next-line no-self-assign
    window.location.href = window.location.href; // reload page
  }

  function logout() {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div className="signin-container">
      <div className="signin">
        <div className="signin-form">
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Email hoặc số điện thoại" />
          </div>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Mật khẩu" />
          </div>
          <a href="/" className="signin-button" onClick={login}>Đăng nhập</a>
          <a href="/" className="signin-forget">Quên mật khẩu?</a>
          <div className="signin-line"></div>
          <div className="signin-button-create" onClick={logout}>Tạo tài khoản mới</div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
