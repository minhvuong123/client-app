import Register from 'pages/register/register';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import './signin.scss';
import { SelectorIsLogin } from 'redux/reducers/authentication.reducer';

function SignIn() {
  const dispatch = useDispatch();
  const [isRegister, setRegister] = useState(false);
  const [form] = Form.useForm();
  const isLogin = useSelector(SelectorIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if(isLogin) {
      navigate('/')
    }
  }, [isLogin, navigate])

  const onFinish = async (values: any) => {
    const originLoginData = values;
    dispatch({ type: 'LOGIN', payload: originLoginData });
  };

  function registerDialog(): void {
    setRegister(!isRegister)
  }

  return (
    <div className="signin-container">
      <div className="signin">
        <div className="signin-form">
          <Form form={form} className="form-container" onFinish={onFinish}>
            <div className="form-group">
              <Form.Item name="email_phone" className="form-input-control" rules={[{ required: true, message: '' }]}>
                <Input className="form-input" placeholder="Email hoặc số điện thoại" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item name="password" className="form-input-control" rules={[{ required: true, message: '' }]}>
                <Input type="password" className="form-input" placeholder="Mật khẩu" />
              </Form.Item>
            </div>
            <div className="form-group">
              <Form.Item>
                <Button type="primary" htmlType="submit" className="signin-button">
                  Đăng nhập
                </Button>
              </Form.Item>
            </div>
          </Form>  
          <a href="/" className="signin-forget">Quên mật khẩu?</a>
          <div className="signin-line"></div>
          <div className="signin-button-create" onClick={registerDialog}>Tạo tài khoản mới</div>
        </div>
      </div>
      { isRegister && <Register onCloseRegister={registerDialog} />}
    </div>
  );
}

export default SignIn;
