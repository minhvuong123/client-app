import PopupMessenger from './popup-messenger/popup-messenger';
import { useGlobalContext } from 'hook';
import { IConversation, IGlobalState } from 'model';
import ReactDOM from 'react-dom';

import './popup-messenger-container.scss';


function PopupMessengerContainer() {
  const [globalContext,] = useGlobalContext() as [IGlobalState, any];

  return globalContext.conversations.length > 0
    ? ReactDOM.createPortal(
      <div className="messenger-popup-container">
        {
          globalContext.conversations.map((conversation: IConversation) => <PopupMessenger key={conversation._id} conversation={conversation} />)
        }
      </div>,
      document.getElementById('root-modal') as HTMLElement
  ) : <></>;
}

export default PopupMessengerContainer;
