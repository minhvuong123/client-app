

import { RegisterModel, RegisterUserRequest } from 'model';
import { Form, Input, Select, Button } from 'antd';
import { userApi, reisterUrl } from 'api';
import { dayOptions, monthOptions, yearOptions } from 'const';

import './register.scss';

const { Option } = Select;


function Register({ onCloseRegister }: RegisterModel) {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const originRegisterData = mapRegisterData(values);
    const {status, data} = await userApi.register(reisterUrl, originRegisterData);

    if(status === 200 && data.status === 'success') {
      form.resetFields();
    }
    
  };

  function mapRegisterData(originData: RegisterUserRequest): RegisterUserRequest {
    const { first_name, last_name, email_phone, password, day_birth, month_birth, year_birth } = originData;

    return {
      first_name,
      last_name,
      email_phone,
      password,
      birthday: `${day_birth}/${month_birth}/${year_birth}`
    }
  }


  return (
    <div className="register-container">
      <div className="register">
        <div className="register-form">
          <div className="form-header">
            <h2 className="header-text">Đăng ký</h2>
            <span className="header-close" onClick={onCloseRegister}>X</span>
          </div>
          <div className="register-line mt-25 mb-25"></div>
          <Form form={form} className="form-container"  onFinish={onFinish}>
            <div className="form-group-inline">
              <Form.Item name="first_name" className="form-input-control" rules={[{ required: true, message: '' }]}>
                <Input className="form-input" placeholder="Họ" />
              </Form.Item>
              <Form.Item name="last_name" className="form-input-control" rules={[{ required: true, message: '' }]}>
                <Input className="form-input" placeholder="Tên" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item name="email_phone" className="form-input-control" rules={[{ required: true, message: '' }]}>
                <Input className="form-input" placeholder="Số di động hoặc email" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item name="password" className="form-input-control" rules={[{ required: true, message: '' }]}>
                <Input type="password" className="form-input" placeholder="Mật khẩu mới" />
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item  name="day_birth" className="form-select-control" rules={[{ required: true, message: '' }]}>
                <Select className="form-select" placeholder="Day" >
                  { dayOptions.map(day => <Option key={day.value} value={day.value}>{day.label}</Option>) }
                </Select>
              </Form.Item>
              <Form.Item name="month_birth" className="form-select-control" rules={[{ required: true, message: '' }]}>
                <Select className="form-select" placeholder="Month" >
                  { monthOptions.map(month => <Option key={month.value} value={month.value}>{month.label}</Option>) }
                </Select>
              </Form.Item>
              <Form.Item name="year_birth" className="form-select-control" rules={[{ required: true, message: '' }]}>
                <Select className="form-select" placeholder="Year" >
                  { yearOptions().map(year => <Option key={year.value} value={year.value}>{year.label}</Option>) }
                </Select>
              </Form.Item>
            </div>

            <div className="form-group">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="register-button">
                  Register
                </Button>
              </Form.Item>
            </div>
          </Form>  
        </div>
      </div>
    </div>
  );
}

export default Register;
