import { IFile, IMessage } from "model";
import { memo, useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import MessengerText from 'components/popup-messenger-container/messenger-text/messenger-text';
import { useSelector } from "react-redux";
import { SelectorAccessUser } from "redux/reducers/authentication.reducer";
import { getMessagesUrl, messageApi, sendMessageUrl } from "api/message.api";
import MessengerHeader from "../messenger-header/messenger-header";
import { nanoid } from 'nanoid';
import { MdLibraryAdd } from "react-icons/md";

import './popup-messenger.scss';

function PopupMessenger({ conversation }: any) {
  const user = useSelector(SelectorAccessUser);
  const [messages, getMessages] = useState([] as IMessage[]);
  const editorRef = useRef() as any;
  const [filesList, setFilesList] = useState([] as IFile[]);;
  const editorFileRef = useRef() as any;
  const scrollRef = useRef<HTMLDivElement>();

  useEffect(() => {
    async function getMessageData() {
      const originMessageData: IMessage = {
        conversationId: conversation._id
      }

      const responseMessage = await messageApi.getMessages(getMessagesUrl, originMessageData);
      const { status, data } = responseMessage;

      if(status === 200 && data.status === 'success' && data.messages) {
        console.log(data.messages);
        getMessages(data.messages);
      }
    }

    getMessageData();
  }, [conversation._id])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      block: 'end',
      behavior: 'auto',
      inline: 'center'
    });

    return () => { }
  }, [messages]);

  async function handleSendMessage(): Promise<void>  {
    const originMessageData: IMessage = {
      conversationId: conversation._id,
      senderId: user._id,
      text: editorRef.current.innerHTML,
      images: []
    }

    if(filesList.length > 0) {
      originMessageData.images = filesList;
    }

    const responseMessage = await messageApi.sendMessage(sendMessageUrl, originMessageData);
    const { status, data } = responseMessage;

    if(status === 200 && data.status === 'success' && data.message) {
      console.log(data.message);
      editorRef.current.innerHTML = '';
    }
  }

  function openUploadFile(): void {
    if (editorFileRef?.current) {
      editorFileRef?.current.click();
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

  function handleRemoveFile(fileId: string) {
    const files = filesList.filter(file => file.file_id !== fileId);

    setFilesList(files);
  }

  return (
    <div className="messenger-popup">
      <div className="popup-wrap">
        <MessengerHeader conversationId={conversation._id} members={conversation.members} />
        <div className="popup-content">
          <div className="content-message">
            {
              messages.length > 0
              && 
              messages.map((message: IMessage) => {
                return <MessengerText key={message._id} message={message} />
              })
            }
            <div ref={scrollRef as any}></div>
          </div>
          <div className="content-control">
            <div className="message-icons">
              <span className="icon-item" onClick={openUploadFile}><MdLibraryAdd /></span>
            </div>
            <div className="message-input-container">
              {
                filesList.length > 0 
                &&
                <div className="message-files-container">
                  <div className="message-files">
                    {
                      filesList.map(file => {
                        return (
                        <div key={file.file_id} className="file-item">
                          <span className="file-close" onClick={() => handleRemoveFile(file.file_id)}>X</span>
                          <img src={file.file_data} alt="" />
                        </div>
                        )
                      })
                    } 
                    <div className="file-upload" onClick={openUploadFile}>
                      <MdLibraryAdd />
                    </div>
                  </div>
                </div>
              }
              <input 
                className="comment-editor-input" 
                style={{display: 'none'}} 
                onChange={uploadImageChange}
                type="file" 
                multiple
                ref={editorFileRef}
              />
              <div ref={editorRef} contentEditable={true} className="message-input"></div>
            </div>
            <div className="message-send" onClick={handleSendMessage}>
              <AiOutlineSend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(PopupMessenger);
