

import FormInput from 'components/formInput/form-input';
import { useHookForm } from 'hook/useForm';
import { RegisterModel } from 'model';
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
            <FormInput
              type="text"
              name="firstName"
              classWrap="w-48"
              placeholder="Họ"
              value={state.firstName}
              validate={[
                { min: 5 }, 
                { max: 100 }, 
                { required: true}
              ]}
              onChange={handleChange}
            />
            <FormInput
              type="text"
              name="lastName"
              classWrap="w-48"
              placeholder="Tên"
              errorMessage="Last name is required !"
              value={state.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <FormInput
              type="text"
              name="emailPhone"
              classWrap="w-100"
              placeholder="Số di động hoặc email"
              errorMessage="Last name is required !"
              value={state.emailPhone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <FormInput
              type="password"
              name="password"
              classWrap="w-100"
              placeholder="Mật khẩu mới"
              errorMessage="Last name is required !"
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
