import Register from 'pages/register/register';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './signin.scss';

function SignIn() {
  const dispatch = useDispatch();
  const [isRegister, setRegister] = useState(false);

  function login(event: any): void {
    event.preventDefault();
    dispatch({ type: 'LOGIN' })
  }

  function logout(): void {
    dispatch({ type: 'LOGOUT' })
  }

  function register(): void {
    setRegister(true)
  }

  function closeRegister(): void {
    setRegister(false)
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
          <div className="signin-button-create" onClick={register}>Tạo tài khoản mới</div>
        </div>
      </div>
      { isRegister && <Register onCloseRegister={closeRegister} />}
    </div>
  );
}

export default SignIn;
