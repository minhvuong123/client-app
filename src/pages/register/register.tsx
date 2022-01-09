
import { useHookForm } from 'hook/useForm';
import { RegisterModel } from 'model';
import { Input } from 'antd';
import './register.scss';


function Register({ onCloseRegister }: RegisterModel) {
  const [state, handleChange] = useHookForm();
  console.log(state);

  return (
    <div className="register-container">
      <div className="register">
        <div className="register-form">
          <div className="form-header">
            <h2 className="header-text">Đăng ký</h2>
            <span className="header-close" onClick={onCloseRegister}>X</span>
          </div>
          <div className="register-line mt-25 mb-25"></div>
          <div className="form-group">
            <Input placeholder="Basic usage" />
            <input
              type="text"
              name="firstName"
              placeholder="Họ"
              className="form-input w-48"
              value={state.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Tên"
              className="form-input w-48"
              value={state.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="emailPhone"
              className="form-input w-100"
              placeholder="Số di động hoặc email"
              value={state.emailPhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-input w-100"
              placeholder="Mật khẩu mới"
              value={state.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <h5 className="form-label w-100">Sinh nhật</h5>
            <select defaultValue={state.dayBirth} name="dayBirth" onChange={(event) => handleChange(event)} className="form-input w-30">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <select defaultValue={state.monthBirth} name="monthBirth" onChange={(event) => handleChange(event)} className="form-input w-30">
              <option value="1">Tháng 1</option>
              <option value="2">Tháng 2</option>
              <option value="3">Tháng 3</option>
              <option value="4">Tháng 4</option>
              <option value="5">Tháng 5</option>
            </select>
            <select defaultValue={state.yearBirth} name="yearBirth" onChange={(event) => handleChange(event)} className="form-input w-30">
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
