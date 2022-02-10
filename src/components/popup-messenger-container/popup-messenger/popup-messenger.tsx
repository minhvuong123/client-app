import { removeConversation, useGlobalContext } from "hook";
import { IGlobalState } from "model";
import { memo } from "react";
import { AiOutlineSend, AiOutlineClose } from "react-icons/ai";

import './popup-messenger.scss';

function PopupMessenger({ conversation }: any) {
  const [, dispatch] = useGlobalContext() as [IGlobalState, any];

  function handleChane(event: any) {
    console.log(event.target.innerHTML);
  }
  
  function handleCLoseConversation() {
    dispatch(removeConversation(conversation._id))
  }

  return (
    <div className="messenger-popup">
      <div className="popup-wrap">
        <div className="popup-header">
          <span className="popup-name">Vương Nguyễn</span>
          <span className="popup-close" onClick={handleCLoseConversation}>
            <AiOutlineClose />
          </span>
        </div>
        <div className="popup-content">
          <div className="content-message">
            <div className="message-owner message-item">
              <span className="message-text">message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
              <span className="message-previewed"></span>
            </div>
            <div className="message-friend message-item">
              <span className="message-user"></span>
              <span className="message-text">message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
            </div>
            <div className="message-owner message-item">
              <span className="message-text">message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
              <span className="message-previewed"></span>
            </div>
            <div className="message-friend message-item">
              <span className="message-user"></span>
              <span className="message-text">message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
            </div>
            <div className="message-owner message-item">
              <span className="message-text">message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
              <span className="message-previewed"></span>
            </div>
            <div className="message-friend message-item">
              <span className="message-user"></span>
              <span className="message-text">message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
            </div>
            <div className="message-owner message-item">
              <span className="message-text">message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
              <span className="message-previewed"></span>
            </div>
            <div className="message-friend message-item">
              <span className="message-user"></span>
              <span className="message-text">message aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
            </div>
          </div>
          <div className="content-control">
            <div className="message-input-container">
              <div contentEditable={true} onInput={handleChane} className="message-input"></div>
            </div>
            <div className="message-send">
              <AiOutlineSend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PopupMessenger);
