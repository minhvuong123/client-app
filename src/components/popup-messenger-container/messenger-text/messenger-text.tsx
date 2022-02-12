
import { serverUrl } from "api";
import { IImage, IMessage } from "model";
import { memo } from "react";
import { useSelector } from "react-redux";
import { SelectorAccessUser } from "redux/reducers/authentication.reducer";
import htmlParse from 'html-react-parser';

import './messenger-text.scss';

function MessengerText({ message }: any) {
  const userOwner = useSelector(SelectorAccessUser);

  function isOwnerUser(message: IMessage) {
    return message.sender?._id === userOwner._id;
  }

  function handleChooseImage(image: IImage) {
    console.log(image);
  }

  return isOwnerUser(message) ? (
    <div className="message-item-container message-owner">
      <div className="message-item">
        <div className="message-text">{htmlParse(message.text)}</div>
        <span className="message-previewed">
          <img src={serverUrl + message.sender.avatar} alt="" />
        </span>
      </div>
      <div className="message-images">
        {
          message.images.map((image: IImage) => {
            return (
              <div key={image._id} className="image-item" onClick={() => handleChooseImage(image)} >
                <img src={serverUrl + image.images_url} alt={image._id} />
              </div>
            )
          })
        }
      </div>
    </div>
  ) : (
    <div className="message-item-container message-friend">
      <div className="message-item">
        <span className="message-user">
          <img src={serverUrl + message.sender.avatar} alt="" />
        </span>
        <div className="message-text">{htmlParse(message.text)}</div>
      </div>
      <div className="message-images">
        {
          message.images.map((image: IImage) => {
            return (
              <div key={image._id} className="image-item" onClick={() => handleChooseImage(image)} >
                <img src={serverUrl + image.images_url} alt={image._id} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default memo(MessengerText);
