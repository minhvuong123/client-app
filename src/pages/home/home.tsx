

import NavBar from "navbar/nav-bar";
import HomeLeft from "pages/home/home-left/home-left";
import HomeMiddle from "pages/home/home-middle/home-middle";
import HomeRight from "pages/home/home-right/home-right";

import './home.scss';

function Home() {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refreshToken');
  const user = localStorage.getItem('user');

  return token && refreshToken && JSON.parse(user || '') && (
    <>
      <NavBar />
      <div className="app-home">
        <HomeLeft />
        <HomeMiddle />
        <HomeRight />
      </div>
    </>
  );
}

export default Home;
