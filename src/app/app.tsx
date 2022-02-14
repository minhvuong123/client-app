
import { userApi, validateUrl, refreshUrl } from "api";
import PopupMessengerContainer from "components/popup-messenger-container/popup-messenger-container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { setSocket } from "redux/actions";
import { LOGIN } from "redux/actions/authentication.action";
import RoutesPath, { RenderRoutes } from "routes/routes";
import io from 'socket.io-client';

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
          dispatch(setSocket(io("ws://localhost:4000")));
        } else {
          userApi.refresh(refreshUrl, { refreshToken }).then(result => {
            const { status, data } = result;
  
            if(status === 200 && data.status === 'success') {
              dispatch({ type: LOGIN.SUCCESS, token: data.token, refreshToken: data.refreshToken, user: data.user });
            } else {
              navigate('/');
            }
          }).catch(() => {
            navigate('/sign-in')
          })
        }
      }).catch(() => {
        navigate('/sign-in')
      })
    } else {
      navigate('/sign-in');
    }
  }, [])

  return (
    <div className="app-container">
      <RenderRoutes routes={RoutesPath} />
      <PopupMessengerContainer />
    </div>
  );
}

export default App;
