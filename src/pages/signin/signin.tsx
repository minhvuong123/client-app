
import './signin.scss';

function SignIn() {
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
          <div className="signin-button">Đăng nhập</div>
          <a href="/" className="signin-forget">Quên mật khẩu?</a>
          <div className="signin-line"></div>
          <div className="signin-button-create">Tạo tài khoản mới</div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
