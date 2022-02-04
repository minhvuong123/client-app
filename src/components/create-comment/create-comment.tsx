import { addingCommentUrl, commentApi } from 'api';
import { addingPostCommentUrl, postApi } from 'api/post.api';
import { ICommentRequest, IFile } from 'model';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';

import './create-comment.scss';

function CreateComment({ postId, commentId, onComment }: any) {
  const user = useSelector(SelectorAccessUser);
  const [filesList, setFilesList] = useState([] as IFile[]);
  const editorRef = useRef() as any;
  const editorFileRef = useRef() as any;

  async function handleKeyEnter(event: HTMLDivElement | any): Promise<void>  {
    if (event.key === 'Enter' && !event.shiftKey) {
      // send comment to post's api
      const originCommentData: ICommentRequest = {
        _id: '',
        comment_user: user,
        comment_text: event.target.innerHTML,
      }

      if(filesList.length > 0) {
        let imageText = '';

        filesList.forEach(file => {
          imageText = imageText + `<span className="image-item"><img src="${file.file_data}" alt="${file.file_name}" /></span>`
        })

        originCommentData.comment_text = originCommentData.comment_text + `<div className="image-list">${imageText}</div>`;
      }

      if(postId) {
        originCommentData._id = postId;
        const responsePost = await postApi.addingPostComment(addingPostCommentUrl, originCommentData)
        const { status, data } = responsePost;

        if(status === 200 && data.message === 'updated' && data.comment) {
          onComment && onComment(data.comment);
          event.target.innerHTML = '';
        }
      } else if(commentId) { // send comment to comment's api
        originCommentData._id = commentId;
        const responseComment = await commentApi.addingComment(addingCommentUrl, originCommentData);
        const { status, data } = responseComment;

        if(status === 200 && data.message === 'success' && data.comment) {
          onComment && onComment(data.comment);
          event.target.innerHTML = '';
        }
      }

      setFilesList([]);
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
    <div className="create-comment-container">
      <div className="create-comment">
        <div className="comment-icon">
          <span className="online"></span>
        </div>
        <div className="comment-create">
          {
            filesList.length > 0 
            &&
            <div className="comment-files-container">
              <div className="comment-files">
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
                <div className="file-upload" onClick={openUploadFile}>attach</div>
              </div>
            </div>
          }
          <div className="comment-create-editable">
            <input 
              className="comment-editor-input" 
              style={{display: 'none'}} 
              onChange={uploadImageChange}
              type="file" 
              multiple
              ref={editorFileRef}
            />
            <div 
              ref={editorRef}
              contentEditable="true" 
              placeholder="Viết bình luận..." 
              className="comment-editable"
              onKeyDown={handleKeyEnter}
            ></div>
            <div className="create-comment-extension">
              <span className="comment-extension-item" onClick={openUploadFile}>attach</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateComment;
