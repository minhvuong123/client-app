

import NavBar from 'navbar/nav-bar';
import './app.scss';
import RoutesPath, { RenderRoutes } from "routes/routes";
import { axiosClient } from 'api/axiosClient';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Register from 'pages/register/register';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   validateToken();
  // }, [])

  async function validateToken() {
    const { status, data } = await axiosClient.post('/users/validate', {});
   
    if(status === 200 && data) {

    }

    return false
  }

  return (
    <div className="app-container">
      <NavBar />
      <RenderRoutes routes={RoutesPath} />
    </div>
  );
}

export default App;
