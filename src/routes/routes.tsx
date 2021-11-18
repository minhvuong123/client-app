import { Route, Routes } from 'react-router-dom';
import Home from 'pages/home/home';
import NotFound from 'pages/not-found/not-found';
import Messengers from 'pages/messengers/messengers';
import Friends from 'pages/friends/friends';
import Watch from 'pages/watch/watch';
import Groups from 'pages/groups/groups';
import Profile from 'pages/profile/profile';

export const RenderRoutes = ({ routes }: any) => {
  return (
    <Routes>
      {
        routes.map((route: any) => {
          return <Route key={route.path} path={route.path} element={route.element} />
        })
      }
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const RoutesPath = [
  { 
    path: '/',
    element: <Home />
  },
  { 
    path: '/messengers',
    element: <Messengers />
  },
  { 
    path: '/friends',
    element: <Friends />
  },
  { 
    path: '/watch',
    element: <Watch />
  },
  { 
    path: '/groups',
    element: <Groups />
  },
  { 
    path: '/profile',
    element: <Profile />
  }
]

export default RoutesPath;