import ReactDOM from 'react-dom';
import { useRef, useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import Cropper from "react-cropper";
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { SelectorAccessUser } from 'redux/reducers/authentication.reducer';
import { uploadAvatarUrl, userApi } from 'api';
import { IFile } from 'model';
import { updateAvatarUrl } from 'redux/actions/authentication.action';

import "cropperjs/dist/cropper.css";
import './popup-upload-avatar.scss';


function PopupUploadAvatar({ open, onChange }: any) {
  const user = useSelector(SelectorAccessUser);
  const editorRef = useRef() as any; 
  const cropperRef = useRef<HTMLImageElement>(null);
  const editorFileRef = useRef() as any;
  const dispatch = useDispatch();
  const [isUploadEdit, setIsUploadEdit] = useState(false);
  const [file, setFile] = useState({} as IFile);

  function handeCloseModal() {
    onChange(false)
  }

  function handleUploadEdit() {
    if (editorFileRef?.current) {
      editorFileRef?.current.click();
    }
  }

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async function uploadImageChange(event: any): Promise<void> {
    const fileUpload = event.target.files[0];

    const base64Url = await getBase64(fileUpload) as any;
    const storeFile: IFile = {
      file_id: nanoid(10),
      file_name: fileUpload.name,
      file_size: fileUpload.size,
      file_type: fileUpload.type,
      file_data: base64Url
    };

    setFile(storeFile);

    // reset value to continue upload to the same image
    event.target.value = '';

    setIsUploadEdit(!isUploadEdit);
  }

  function renderPopupButtons() {
    return (
      <div className="popup-buttons">
         <input 
            className="comment-editor-input" 
            style={{display: 'none'}} 
            onChange={uploadImageChange}
            type="file" 
            multiple
            ref={editorFileRef}
          />
        <span className="popup-button-upload" onClick={handleUploadEdit}>
          <AiOutlinePlus />
          Tải ảnh lên
        </span>
      </div>
    )
  }

  async function handCropImage() {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    const dataUrl = cropper.getCroppedCanvas().toDataURL();
    const fileOriginData = {...file, _id: user._id};
    fileOriginData.file_data = dataUrl;

    if(dataUrl) {
      const responseUser = await userApi.uploadAvatar(uploadAvatarUrl, { ...fileOriginData });
      const { status, data } = responseUser;

      if(status === 200 && data.status === "updated" && data.imageUrl) {
        dispatch(updateAvatarUrl(data.imageUrl));
        onChange(false)
      }
    }
  };

  function renderUploadEdit() {
    return (
      <div className="popup-upload-edit">
        <div className="upload-description">
          <div ref={editorRef} contentEditable="true" placeholder="Mô tả" className="description-editable"></div>
        </div>
        <div className="upload-edit-avatar">
          <Cropper
            src={file.file_data}
            style={{ maxHeight: 260, width: '100%' }}
            initialAspectRatio={1}
            dragMode={"move"}
            guides={false}
            minCropBoxWidth={250}
            minCropBoxHeight={250}
            scaleX={1}
            scaleY={1}
            ref={cropperRef}
          />
        </div>
        <div className="upload-buttons">
          <span className="button-item buttons-cancel" onClick={() => onChange(false)}>Hủy</span>
          <span className="button-item buttons-save" onClick={handCropImage}>Lưu</span>
        </div>
      </div> 
    )
  }

  return open ? ReactDOM.createPortal(
    <div className="popup-upload-avatar-container">
      <div className="popup-blur" onClick={handeCloseModal}></div>
      <div className="popup-upload-avatar">
        <div className="popup-header">
          <span className="popup-title">Cập nhật ảnh đại diện</span>
          <span className="popup-close" onClick={handeCloseModal}><AiOutlineClose /></span>
        </div>
        <div className="popup-content">
          { !isUploadEdit ? renderPopupButtons() : renderUploadEdit() }
        </div>
      </div>
    </div>,
    document.getElementById('root-modal') as HTMLElement
  ) : <></>;
}

export default PopupUploadAvatar;
