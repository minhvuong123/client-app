import ReactDOM from 'react-dom';
import PopupShared from './popup-shared/popup-shared';
import PopupTyping from './popup-typing/popup-typing';
import { useGlobalContext } from 'hook';
import { IGlobalState } from 'model/globalState.model';

import './popup-create-post.scss';


function PopupCreatePost({ open, onPost, onChange }: any) {
  const [globalContext,] = useGlobalContext() as [IGlobalState, any];

  function handeCloseModal() {
    onChange(false)
  }

  return open ? ReactDOM.createPortal(
    <div className="popup-create-post-container">
      <div className="popup-blur" onClick={handeCloseModal}></div>
      <div className="popup-create-post">
        {
          globalContext?.typingPopup ? <PopupTyping onPost={onPost} onChange={onChange} /> : <PopupShared />
        }
      </div>
    </div>,
    document.getElementById('root-modal') as HTMLElement
  ) : <></>;
}

export default PopupCreatePost;
