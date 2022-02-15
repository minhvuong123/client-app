import { addingPostUrl, postApi } from 'api/post.api';
import { sharedMapping } from 'const';
import { setTypingPopup } from 'hook';
import  { useGlobalContext } from 'hook/globalContext';
import { IFile, IPostRequest, UserResponse } from 'model';
import { IGlobalState } from 'model/globalState.model';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';
import { AiOutlineClose } from "react-icons/ai";

import './popup-typing.scss';

function PopupTyping({ onPost, onChange }: any) {
  const user = useSelector(SelectorAccessUser) as UserResponse;
  const [filesList, setFilesList] = useState([] as IFile[]);
  const [globalState, dispatch] = useGlobalContext() as [IGlobalState, any];
  const [textEditor, setTextEditor] = useState('');
  const editorRef = useRef() as any;
  const editorFileRef = useRef() as any;
  
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
      post_text: textEditor,
      post_images: []
    }

    if(filesList.length > 0) {
      originPost.post_images = filesList;
    }

    const responsePost = await postApi.addingPost(addingPostUrl, originPost);
    const { status, data } = responsePost;

    if(status === 200 && data.status === 'success' && data.post) {
      onPost(data.post);
      onChange(false);
    }
  }

  async function uploadImageChange(event: any): Promise<void> {
    editorRef.current.focus();
    const files = event.target.files;
    const filesStore: IFile[] = []; 

    for (const file of files) {
      const base64Url = await getBase64(file) as any;
      const storeFile: IFile = {
        file_id: nanoid(10),
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        file_data: base64Url
      };

      filesStore.push(storeFile);
    }

    setFilesList([...filesList, ...filesStore]);

    // reset value to continue upload to the same image
    event.target.value = '';
  }

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  function openUploadFile(): void {
    if (editorFileRef?.current) {
      editorFileRef?.current.click();
    }
  }

  function removeFilesList(): void {
    setFilesList([]);
  }

  function getClassNameImageItem(fileLength: number, index: number) {
    if (fileLength <= 2) {
      return 'w-100';
    } else if (fileLength === 3) {
      if(index === 0) return 'w-100';
      return 'w-50'
    } else {
      if(index === 0) return 'w-100';
      if(index === 1 || index === 2 || index === 3 ) return 'w-33'
    }
  }

  function postDisabled(): boolean {
    return textEditor !== '' || filesList.length > 0 ? false : true;
  }

  return (
    <div className="popup-typing">
      <div className="popup-header">
        <span className="header-title">Tạo bài viết</span>
        <span className="header-close" onClick={handeCloseModal}>
          <AiOutlineClose />
        </span>
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
            <div 
              ref={editorRef} 
              contentEditable={true} 
              onInput={handleChange} 
              className="typing-text" 
              placeholder="Bạn đang nghĩ gì thế?">
            </div>
          </div>
          {
            filesList.length > 0
            &&
            <div className="typing-images flex-row">
              {
                filesList.map((file: IFile, index: number) => {
                  if(index <= 2) {
                    return  (
                      <div key={file.file_id} className={`image-item ${getClassNameImageItem(filesList.length, index)}`}>
                        <img src={file.file_data} alt={file.file_name} />
                      </div>
                    ) 
                  } else if(index === 3) {
                    return (
                      <div key={file.file_id} className={`image-item ${getClassNameImageItem(filesList.length, index)}`}>
                        <img src={file.file_data} alt={file.file_name} />
                        {
                          filesList.length > 4 
                          && 
                          <span className="image-item-total">+{ filesList.length - 4 }</span>
                        }
                      </div>
                    )
                  }
                  return ''
                })
              }
              <div className="images-remove" onClick={removeFilesList}>
                <AiOutlineClose />
              </div>
            </div>
          }
        </div>
        <div className="control-actions">
          <input 
              className="comment-editor-input" 
              style={{display: 'none'}} 
              onChange={uploadImageChange}
              type="file" 
              multiple
              ref={editorFileRef}
            />
            <span className="control-item" onClick={openUploadFile}>attach</span>
          </div>
          <button className="control-post" disabled={postDisabled()} onClick={handlePost}>Đăng</button>
      </div>
    </div>
  );
}

export default PopupTyping;
