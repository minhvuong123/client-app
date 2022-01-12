

import NavBar from "navbar/nav-bar";
import HomeLeft from "pages/home/home-left/home-left";
import HomeMiddle from "pages/home/home-middle/home-middle";
import HomeRight from "pages/home/home-right/home-right";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SelectorIsLogin } from "redux/reducers/authentication.reducer";

import './home.scss';

function Home() {
  const navigate =  useNavigate();
  const isLogin = useSelector(SelectorIsLogin);

  useEffect(() => {
    if(!isLogin) {
      navigate('/sign-in')
    }
  }, [isLogin])

  return isLogin && (
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
