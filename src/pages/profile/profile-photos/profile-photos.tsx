

import { getImagesUrl, serverUrl, userApi } from 'api';
import { IImage, UserResponse } from 'model';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';
import './profile-photos.scss';

function ProfilePhotos() {
  const userOwn = useSelector(SelectorAccessUser);
  const location = useLocation() as any;
  const [images, setImages] = useState([] as IImage[]);
  const [userDisplay, setUserDisplay] = useState({} as UserResponse);

  useEffect(() => {
    if(friendRoute(location.pathname)) {
      if(location.state && location.state.user) {
        setUserDisplay(location.state.user);
      } 
    } else {
      setUserDisplay(userOwn);
    }
  }, [location, userOwn])

  useEffect(() => {
    async function getImagesData() {
      const originFriendsData = {
        _id: userDisplay._id
      }

      const responseUser = await userApi.getImages(getImagesUrl, originFriendsData);
      const { status, data } = responseUser;

      if(status === 200 && data.status === 'success' && data.images) {
        setImages(data.images);
      }
    }

    if(userDisplay._id && userDisplay._id) {
      getImagesData();
    }
  }, [userDisplay])

  function friendRoute(pathName: string): boolean {
    const paths = pathName.split('/');
    return paths[1].includes('friends');
  }
  return (
    <div className="profile-images-conatiner">
      <div className="images-header">Ảnh</div>
      <div className="images-content">
        {
          images.length > 0
          &&
          images.map((image: IImage) => {
            return (
              <span key={image._id} className="images-item">
                <img src={serverUrl + image.images_url} alt={image._id} />
              </span>
            )
          }) 
        }
      </div>
    </div>
  );
}

export default ProfilePhotos;
