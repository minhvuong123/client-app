
import { userApi, validateUrl } from "api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOGIN } from "redux/actions/authentication.action";
import RoutesPath, { RenderRoutes } from "routes/routes";
import './app.scss';

function App() {
  const token = localStorage.getItem('access_token');
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();

  useEffect(() => {
    if(token && user) {
      userApi.validate(validateUrl).then(result => {
        const { status, data } = result;

        if(status === 200 && data.status === 'success') {
          dispatch({ type: LOGIN.SUCCESS, token: token, user: user });
        }
      })
    }
  }, [])

  return (
    <div className="app-container">
      <RenderRoutes routes={RoutesPath} />
    </div>
  );
}

export default App;
