import { IFile, IMessage } from "model";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import MessengerText from 'components/popup-messenger-container/messenger-text/messenger-text';
import { useSelector } from "react-redux";
import { SelectorAccessUser } from "redux/reducers/authentication.reducer";
import { getMessagesUrl, messageApi, sendMessageUrl } from "api/message.api";
import MessengerHeader from "../messenger-header/messenger-header";
import { nanoid } from 'nanoid';
import { MdLibraryAdd } from "react-icons/md";
import { SelectorSocketUser } from "redux/reducers/user.reducer";

import './popup-messenger.scss';

function PopupMessenger({ conversation }: any) {
  const user = useSelector(SelectorAccessUser);
  const socketUser = useSelector(SelectorSocketUser);
  const [messages, setMessages] = useState([] as IMessage[]);
  const [arrivalMessage, setArrivalMessage] = useState({} as any);
  const editorRef = useRef() as any;
  const [filesList, setFilesList] = useState([] as IFile[]);;
  const editorFileRef = useRef() as any;
  const scrollRef = useRef<HTMLDivElement>();
  const [typing, setTyping] = useState('');

  const connectSocket = useCallback(() => {
    // emit leave-room currently
    socketUser.emit('leave-room');

    // emit join-room flat
    socketUser.emit('join-room', { conversationId: conversation._id, userId: user._id });
 }, [conversation._id, socketUser, user._id])

  useEffect(() => {

    connectSocket();

    async function getMessageData() {
      const originMessageData: IMessage = {
        conversationId: conversation._id
      }

      const responseMessage = await messageApi.getMessages(getMessagesUrl, originMessageData);
      const { status, data } = responseMessage;

      if(status === 200 && data.status === 'success' && data.messages) {
        setMessages(data.messages);
      }
    }

    getMessageData();
  }, [conversation._id, connectSocket])

  // listen to arrival message
  useEffect(() => {
    socketUser.on('client-get-message', (message: IMessage) => {
      setArrivalMessage(message);
    })

    socketUser.on('get-someone-typing', (fullname: string) => {
      setTyping(fullname);
    })

    socketUser.on('get-someone-stop-typing', () => {
      setTyping('');
    })

    return () => { }
  }, [socketUser]);

  // update arrival message to messsages
  useEffect(() => {
    if (Object.keys(arrivalMessage).length > 0 &&  user._id !== arrivalMessage.sender._id) { // condition to void leaking memory
      setMessages(messages => [...messages, arrivalMessage]);
    }
    
    return () => { }
  }, [arrivalMessage, user._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      block: 'end',
      behavior: 'auto',
      inline: 'center'
    });

    return () => { }
  }, [messages, typing]);

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
      setMessages([...messages, data.message])
      editorRef.current.innerHTML = '';

      socketUser.emit('client-send-message', data.message);
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

  function getFullName(first_name: string = '', last_name: string = ''): string { 
    return `${first_name} ${last_name}`;
  }
  
  function handleFocus() {
    socketUser.emit('someone-typing', getFullName(user.first_name, user.last_name));
  }

  function handleFocusOut() {
    socketUser.emit('someone-stop-typing');
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
            {
              typing && <div className="someone-typing">{typing}</div>
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
              <div ref={editorRef} contentEditable={true} onFocus={handleFocus} onBlur={handleFocusOut} className="message-input"></div>
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
