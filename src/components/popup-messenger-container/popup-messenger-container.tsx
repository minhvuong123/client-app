import './popup-messenger-container.scss';
import PopupMessenger from './popup-messenger/popup-messenger';

function PopupMessengerContainer() {
  return (
    <div className="messenger-popup-container">
      <PopupMessenger />
      <PopupMessenger />
    </div>
  );
}

export default PopupMessengerContainer;
