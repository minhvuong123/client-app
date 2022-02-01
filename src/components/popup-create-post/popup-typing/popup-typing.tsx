
import { addingPostUrl, postApi } from 'api/post.api';
import { sharedMapping } from 'const';
import { setTypingPopup } from 'hook';
import  { useGlobalContext } from 'hook/globalContext';
import { IPostRequest, UserResponse } from 'model';
import { IGlobalState } from 'model/globalState.model';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';

import './popup-typing.scss';

function PopupTyping({ onChange }: any) {
  const user = useSelector(SelectorAccessUser) as UserResponse;
  const [globalState, dispatch] = useGlobalContext() as [IGlobalState, any];
  const [textEditor, setTextEditor] = useState('');
  
  function handeCloseModal() {
    onChange(false)
  }

  function handleChange(event: any) {
    setTextEditor(event.target.innerHTML);
  }

  function handleTypingPopup() {
    dispatch(setTypingPopup(false))
  }

  function getSharedText(text: string) {
    const key = text as keyof typeof sharedMapping;
    return sharedMapping[key]
  }

  async function handlePost() {
    const originPost: IPostRequest = {
      post_user: user,
      post_shared: globalState.shared,
      post_text: textEditor
    }
    const responsePost = await postApi.addingPost(addingPostUrl, originPost);
    const { status, data } = responsePost;

    if(status === 200 && data.status === 'success') {
      onChange(false);
    }
    console.log(status, data);
  }

  return (
    <div className="popup-typing">
      <div className="popup-header">
        <span className="header-title">Tạo bài viết</span>
        <span className="header-close" onClick={handeCloseModal}>X</span>
      </div>
      <div className="popup-content">
        <div className="popup-user">
          <div className="user-icon"></div>
          <div className="user-info">
            <span className="user-name">Vương Nguyễn</span>
            <span className="user-shared" onClick={handleTypingPopup}>{ getSharedText(globalState?.shared || sharedMapping['only-self']) }</span>
          </div>
        </div>
        <div className="content-control">
          <div className="typing-container">
            <div contentEditable={true} onBlur={handleChange} className="typing-text" placeholder="Bạn đang nghĩ gì thế?"></div>
          </div>
          <div className="control-actions">
            <span className="control-item">attach</span>
          </div>
          <div className="control-post" onClick={handlePost}>Đăng</div>
        </div>
      </div>
    </div>
  );
}

export default PopupTyping;
