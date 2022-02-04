import PopupCreatePost from 'components/popup-create-post/popup-create-post';
import { useState } from 'react';

import './create-post.scss';

function CreatePost({ onPost }: any) {
  const [openModal, setOpenModal] = useState(false);

  function handleModal() {
    setOpenModal(true)
  }

  function onChangeModal(value: boolean) {
    setOpenModal(value)
  }

  return (
    <div className="create-post-container">
      <div className="create-post">
        <span className="post-icon"></span>
        <span className="post-create" onClick={handleModal}>Nguyễn ơi, bạn đang nghĩ gì thế?</span>
      </div>
      <PopupCreatePost open={openModal} onPost={onPost} onChange={onChangeModal} />
    </div>
  );
}

export default CreatePost;
