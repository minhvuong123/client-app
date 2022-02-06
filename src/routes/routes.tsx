import { Route, Routes } from 'react-router-dom';
import Home from 'pages/home/home';
import NotFound from 'pages/not-found/not-found';
import Messengers from 'pages/messengers/messengers';
import Friends from 'pages/friends/friends';
import Watch from 'pages/watch/watch';
import Groups from 'pages/groups/groups';
import Profile from 'pages/profile/profile';
import SignIn from 'pages/signin/signin';
import ProfilePhotos from 'pages/profile/profile-photos/profile-photos';
import ProfileHome from 'pages/profile/profile-home/profile-home';
import ProfileFriends from 'pages/profile/profile-friends/profile-friends';

export const RenderRoutes = ({ routes }: any) => {
  return (
    <Routes>
      {
        routes.map((route: any) => {
          if(route.nested) {
            return <Route key={route.path} path={route.path} element={route.element}>
              {
                route.nested.map((nestedRoute: any) => {
                  if(nestedRoute.path === '') {
                    return <Route index element={nestedRoute.element} />
                  }
                  return <Route key={nestedRoute.path} path={nestedRoute.path} element={nestedRoute.element} />
                })
              }
            </Route>
          }

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
    id: 'sign-in',
    path: 'sign-in',
    element: <SignIn />
  },
  { 
    id: 'messengers',
    path: 'messengers',
    element: <Messengers />
  },
  { 
    id: 'friends',
    path: 'friends',
    element: <Friends />,
  },
  { 
    id: 'friends',
    path: 'friends/*',
    element: <Friends />,
    nested: [
      { 
        path: ':id/posts',
        element: <ProfileHome />
      },
      { 
        path: ':id/friends',
        element: <ProfileFriends itemTotal={5} />
      },
      { 
        path: ':id/photos',
        element: <ProfilePhotos />
      },
    ]
  },
  { 
    id: 'watch',
    path: 'watch',
    element: <Watch />
  },
  { 
    id: 'groups',
    path: 'groups',
    element: <Groups />
  },
  { 
    id: 'profile',
    path: ':profile',
    element: <Profile isShowNavBar={true} />,
    nested: [
      { 
        path: 'posts',
        element: <ProfileHome />
      },
      { 
        path: 'friends',
        element: <ProfileFriends itemTotal={8} />
      },
      { 
        path: 'photos',
        element: <ProfilePhotos />
      },
    ]
  },
  { 
    id: '404',
    path: '404',
    element: <NotFound />
  },
]

export default RoutesPath;