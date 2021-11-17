
import './register.scss';

function Register() {
  return (
    <div className="register-container">
      <div className="register">
        <div className="register-form">
          <div className="form-header">
            <h2 className="header-text">Đăng ký</h2>
            <span className="header-close">X</span>
          </div>
          <div className="register-line mt-25 mb-25"></div>
          <div className="form-group">
            <input type="text" className="form-input w-58" placeholder="Họ" />
            <input type="text" className="form-input w-58" placeholder="Tên" />
          </div>
          <div className="form-group">
            <input type="text" className="form-input w-100" placeholder="Số di động hoặc email" />
          </div>
          <div className="form-group">
            <input type="text" className="form-input w-100" placeholder="Mật khẩu mới" />
          </div>
          <div className="form-group">
            <h5 className="form-label w-100">Sinh nhật</h5>
            <select className="form-input w-30">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <select className="form-input w-30">
              <option>Tháng 1</option>
              <option>Tháng 2</option>
              <option>Tháng 3</option>
              <option>Tháng 4</option>
              <option>Tháng 5</option>
            </select>
            <select className="form-input w-30">
              <option>2021</option>
              <option>2020</option>
              <option>2019</option>
              <option>2018</option>
            </select>
          </div>
          <div className="register-button">Đăng ký</div>
        </div>
      </div>
    </div>
  );
}

export default Register;
