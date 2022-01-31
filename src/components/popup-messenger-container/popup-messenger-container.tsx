
import PopupMessenger from './popup-messenger/popup-messenger';
import './popup-messenger-container.scss';

function PopupMessengerContainer() {
  return (
    <div className="messenger-popup-container">
      <PopupMessenger />
      <PopupMessenger />
    </div>
  );
}

export default PopupMessengerContainer;
