
import { userApi, validateUrl, refreshUrl } from "api";
import NavBar from "navbar/nav-bar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LOGIN } from "redux/actions/authentication.action";
import RoutesPath, { RenderRoutes } from "routes/routes";
import './app.scss';

function App() {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(token && user) {
      userApi.validate(validateUrl).then(result => {
        const { status, data } = result;

        if(status === 200 && data.status === 'success') {
          dispatch({ type: LOGIN.SUCCESS, token, refreshToken, user: JSON.parse(user) });
        } else {
          userApi.refresh(refreshUrl, { refreshToken }).then(result => {
            const { status, data } = result;
  
            if(status === 200 && data.status === 'success') {
              dispatch({ type: LOGIN.SUCCESS, token: data.token, refreshToken: data.refreshToken, user: data.user });
            } else {
              navigate('/');
            }
          }).catch(() => {
            navigate('/');
          })
        }
      })
    } else {
      navigate('/sign-in');
    }
  }, [])

  return (
    <div className="app-container">
      <NavBar />
      <RenderRoutes routes={RoutesPath} />
    </div>
  );
}

export default App;
